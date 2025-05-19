package com.findee.findeeBackend.services;

import com.findee.findeeBackend.entities.Empleo;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Map;

public interface FindeeService {

    List<Empleo> findAllEmpleos();
    //Obtener los empleados paginados y con filtros
    Page<Empleo> getAllEmpleosFiltrados(
            int page,
            int size,
            String tipoEmpleo,
            String tipoContrato,
            String tipoJornada,
            String ciudad,
            String categoriaTrabajo
    );
    //Opciones de filtro
    public Map<String, List<String>> obtenerOpcionesFiltro();


    //Obtener usuario id
    Integer obtenerUsuarioId(Authentication authentication);
    //Agregar un empleo a favoritos de un usuario
    void agregarFavorito(Integer usuarioId, Integer empleoId);
    //Eliminar un empleo de favoritos de un usuario
    void eliminarFavorito(Integer usuarioId, Integer empleoId);

    //Obtener los empleos favoritos de un usuario
    List<Empleo>obtenerFavoritosPorUsuario(Integer usuarioId);
    //Ver si un empleo ya esta en favoritos de un usuario
    boolean esFavorito(Integer usuarioId, Integer empleoId);

}
