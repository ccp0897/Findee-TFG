package com.findee.findeeBackend.services;

import com.findee.findeeBackend.entities.Usuario;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UsuarioService {
    void registrarUsuario(Usuario usuario, MultipartFile cvFile) throws IOException;
}
