package com.findee.findeeBackend.dao;

import com.findee.findeeBackend.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UsuarioDao extends JpaRepository<Usuario, Integer> {
    boolean existsByEmail(String email);

    Usuario findByEmail(String email);

    @Query("select u from Usuario u where u.id=:id")
    Usuario buscarUsuarioPorId(Integer id);
}
