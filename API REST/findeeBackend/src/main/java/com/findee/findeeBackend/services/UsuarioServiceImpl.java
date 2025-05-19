package com.findee.findeeBackend.services;


import com.findee.findeeBackend.dao.UsuarioDao;
import com.findee.findeeBackend.entities.Usuario;

import com.findee.findeeBackend.utilities.PdfTextExtractor;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private final UsuarioDao usuarioDao;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final PdfTextExtractor pdfTextExtractor;

    // Inyección de dependencias
    public UsuarioServiceImpl(UsuarioDao usuarioDao,
                          PasswordEncoder passwordEncoder,
                          PdfTextExtractor pdfTextExtractor) {
        this.usuarioDao = usuarioDao;
        this.passwordEncoder = passwordEncoder;
        this.pdfTextExtractor = pdfTextExtractor;
    }

    /**
     * Registra un nuevo usuario en el sistema
     * @param usuario Datos del usuario (sin contraseña encriptada)
     * @param cvFile Archivo PDF con el CV
     * @throws IllegalArgumentException Si el email ya está registrado
     * @throws IOException Si hay error procesando el PDF
     */
    @Override
    @Transactional
    public void registrarUsuario(Usuario usuario, MultipartFile cvFile) throws IOException {
        // Verificar si el email ya existe
        if (usuarioDao.existsByEmail((usuario.getEmail()))){
            throw new IllegalArgumentException("El email ya está registrado");
        }

        // Procesar PDF y extraer texto
        String cvTexto = pdfTextExtractor.extractText(cvFile.getInputStream());

        // Encriptar contraseña y guardar usuario
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        usuario.setCv(cvTexto);
        System.out.println("El usuario final es:" + usuario);

        usuarioDao.save(usuario);
    }

    @Override
    public Usuario obtenerUsuarioPorId(Integer id){
        return usuarioDao.buscarUsuarioPorId(id);
    }

    @Override
    public Usuario save(Usuario usuario) {
        return usuarioDao.save(usuario);
    }
}