package com.findee.findeeBackend.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.findee.findeeBackend.dto.ErrorResponse;
import com.findee.findeeBackend.dto.LoginRequest;
import com.findee.findeeBackend.dto.LoginResponse;
import com.findee.findeeBackend.entities.Usuario;
import com.findee.findeeBackend.services.AuthService;
import com.findee.findeeBackend.services.UsuarioServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private final UsuarioServiceImpl usuarioService;
    private final AuthService authService;

    public AuthController(UsuarioServiceImpl usuarioService, AuthService authService) {
        this.usuarioService = usuarioService;
        this.authService = authService;
    }

    /**
     * Endpoint para registro de nuevos usuarios
     * @param usuario Datos del usuario desde el formulario
     * @param cvFile Archivo PDF con el CV
     * @return ResponseEntity con el resultado de la operación
     */
    @PostMapping(value = "/registro", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registrarUsuario(
            @RequestPart("usuario") String usuario,
            @RequestPart("cvFile") MultipartFile cvFile) {

        try {
            // Debug 1: Verifica recepción de datos
            System.out.println("=== DATOS RECIBIDOS ===");
            System.out.println("JSON recibido: " + usuario);
            System.out.println("CV recibido: " + cvFile.getOriginalFilename() + " (" + cvFile.getSize() + " bytes)");

            // Debug 2: Conversión del JSON
            ObjectMapper mapper = new ObjectMapper();
            Usuario usuarioNuevo = mapper.readValue(usuario, Usuario.class);
            System.out.println("Usuario convertido: " + usuarioNuevo.toString());

            // Procesar registro
            usuarioService.registrarUsuario(usuarioNuevo, cvFile);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            // Debug 3: Captura errores específicos
            System.err.println("ERROR EN REGISTRO: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            // Captura errores de usuario/contraseña
            String errorMessage = e.getMessage();
            String errorType = errorMessage.contains("no encontrado") ? "USER_NOT_FOUND" : "INVALID_PASSWORD";

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(errorMessage, errorType, false));
        } catch (Exception e) {
            // Otros errores inesperados
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Error interno del servidor", "SERVER_ERROR", false));
        }
    }
}