package com.findee.findeeBackend.dao;

import com.findee.findeeBackend.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioDao extends JpaRepository<Usuario, Integer> {
    boolean existsByEmail(String email);

    Usuario findByEmail(String email);
}
