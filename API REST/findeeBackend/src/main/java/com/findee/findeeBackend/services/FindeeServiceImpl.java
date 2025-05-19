package com.findee.findeeBackend.services;

import com.findee.findeeBackend.dao.EmpleoDao;
import com.findee.findeeBackend.dao.UsuarioDao;
import com.findee.findeeBackend.dao.UsuariosEmpleoDao;
import com.findee.findeeBackend.entities.Empleo;
import com.findee.findeeBackend.entities.Usuario;
import com.findee.findeeBackend.entities.UsuariosEmpleo;
import com.findee.findeeBackend.entities.UsuariosEmpleoId;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class FindeeServiceImpl implements FindeeService {
    @Autowired
    EmpleoDao empleoDao;
    @Autowired
    UsuarioDao usuarioDao;
    @Autowired
    UsuariosEmpleoDao usuariosEmpleoDao;

    public FindeeServiceImpl(){}
    public FindeeServiceImpl(EmpleoDao empleoDao, UsuariosEmpleoDao usuariosEmpleoDao, UsuarioDao usuarioDao) {
        this.empleoDao = empleoDao;
        this.usuariosEmpleoDao = usuariosEmpleoDao;
        this.usuarioDao = usuarioDao;
    }

    @Override
    public List<Empleo> findAllEmpleos() {
        return empleoDao.findAll();
    }

    @Override
    public Page<Empleo> getAllEmpleosFiltrados(int page,
                                      int size,
                                      String tipoEmpleo,
                                      String tipoContrato,
                                      String tipoJornada,
                                      String ciudad,
                                      String categoriaTrabajo) {
        PageRequest pageable = PageRequest.of(page, size);

        Specification<Empleo> spec = (root, query, cb) -> {
            List<Predicate>predicates = new ArrayList<>();

            // Filtro por tipo de empleo (puede contener múltiples valores separados por comas)
            if (tipoEmpleo != null && !tipoEmpleo.isEmpty()) {
                String[] tipos = tipoEmpleo.split(",");
                Predicate[] tipoPredicates = new Predicate[tipos.length];
                for (int i = 0; i < tipos.length; i++) {
                    tipoPredicates[i] = cb.equal(root.get("remote"), tipos[i]);
                }
                predicates.add(cb.or(tipoPredicates));
            }
            // Filtro por tipo de contrato
            if (tipoContrato != null && !tipoContrato.isEmpty()) {
                String[] contratos = tipoContrato.split(",");
                Predicate[] contratoPredicates = new Predicate[contratos.length];
                for (int i = 0; i < contratos.length; i++) {
                    contratoPredicates[i] = cb.equal(root.get("contractType"), contratos[i]);
                }
                predicates.add(cb.or(contratoPredicates));
            }
            // Filtro por tipo de jornada
            if (tipoJornada != null && !tipoJornada.isEmpty()) {
                String[] jornadas = tipoJornada.split(",");
                Predicate[] jornadaPredicates = new Predicate[jornadas.length];
                for (int i = 0; i < jornadas.length; i++) {
                    jornadaPredicates[i] = cb.equal(root.get("workday"), jornadas[i]);
                }
                predicates.add(cb.or(jornadaPredicates));
            }
            // Filtro por ciudad
            if (ciudad != null && !ciudad.isEmpty()) {
                predicates.add(cb.equal(root.get("city"), ciudad));
            }

            // Filtro por categoría de trabajo
            if (categoriaTrabajo != null && !categoriaTrabajo.isEmpty()) {
                String[] categorias = categoriaTrabajo.split(",");
                Predicate[] categoriaPredicates = new Predicate[categorias.length];
                for (int i = 0; i < categorias.length; i++) {
                    categoriaPredicates[i] = cb.equal(root.get("jobCategory"), categorias[i]);
                }
                predicates.add(cb.or(categoriaPredicates));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return empleoDao.findAll(spec, pageable);
    }

    @Override
    public Map<String, List<String>> obtenerOpcionesFiltro() {
        Map<String, List<String>> opciones = new HashMap<>();

        opciones.put("tipoEmpleo", empleoDao.findDistinctByTipoEmpleo());
        opciones.put("tipoContrato", empleoDao.findDistinctByTipoContrato());
        opciones.put("tipoJornada", empleoDao.findDistinctByTipoJornada());
        opciones.put("ciudad", empleoDao.findDistinctByCiudad());
        opciones.put("categoriaTrabajo", empleoDao.findDistinctByCategoriaTrabajo());

        return opciones;
    }



    //Obtener el id de un usuario
    @Override
    public Integer obtenerUsuarioId(Authentication authentication) {
        String email = authentication.getName();
        Usuario usuario = usuarioDao.findByEmail(email);

        if(usuario == null){
            throw new RuntimeException("El usuario no existe");
        }

        return usuario.getId();
    }

    //Metodos para acciones de favoritos
    @Override
    @Transactional
    public void agregarFavorito(Integer usuarioId, Integer empleoId) {
        //Verificar si ya está agregado
        if(usuariosEmpleoDao.existsByUsuarioIdAndEmpleoId(usuarioId, empleoId)){
            throw new RuntimeException("El usuario ya tiene este empleo agregado como favorito");
        }

        UsuariosEmpleoId id = new UsuariosEmpleoId();
        id.setUsuarioId(usuarioId);
        id.setEmpleoId(empleoId);
        UsuariosEmpleo favorito = new UsuariosEmpleo();
        favorito.setId(id);

        Empleo empleo = empleoDao.findById(empleoId).orElseThrow(() -> new RuntimeException("El empleo no existe"));
        Usuario usuario = usuarioDao.findById(usuarioId).orElseThrow(() -> new RuntimeException("El usuario no existe"));

        favorito.setEmpleo(empleo);
        favorito.setUsuario(usuario);

        usuariosEmpleoDao.save(favorito);

    }

    @Override
    @Transactional
    public void eliminarFavorito(Integer usuarioId, Integer empleoId) {
        usuariosEmpleoDao.deleteByUsuarioIdAndEmpleoId(usuarioId, empleoId);
    }

    @Override
    public List<Empleo>obtenerFavoritosPorUsuario(Integer usuarioId){
        List<Empleo> empleos = new ArrayList<>();
        usuariosEmpleoDao.findByUsuarioId(usuarioId).forEach(e -> empleos.add(e.getEmpleo()));
        return empleos;
    }

    @Override
    public boolean esFavorito(Integer usuarioId, Integer empleoId){
        return usuariosEmpleoDao.existsByUsuarioIdAndEmpleoId(usuarioId, empleoId);
    }

}
