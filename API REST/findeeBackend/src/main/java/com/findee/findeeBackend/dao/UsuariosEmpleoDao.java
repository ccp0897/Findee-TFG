package com.findee.findeeBackend.dao;

import com.findee.findeeBackend.entities.UsuariosEmpleo;
import com.findee.findeeBackend.entities.UsuariosEmpleoId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsuariosEmpleoDao extends JpaRepository<UsuariosEmpleo, UsuariosEmpleoId> {

    //Buscar todos los favoritos de un usuario
    List<UsuariosEmpleo> findByUsuarioId(Integer usuarioId);

    //Verificar si un empleo ya está en favoritos de un usuario
    boolean existsByUsuarioIdAndEmpleoId(Integer usuarioId, Integer empleoId);

    //Eliminar un empleo de favoritos por usuario y empleoId
    void deleteByUsuarioIdAndEmpleoId(Integer usuarioId, Integer empleoId);

}
