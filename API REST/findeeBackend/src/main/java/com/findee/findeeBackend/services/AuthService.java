package com.findee.findeeBackend.services;

import com.findee.findeeBackend.dao.UsuarioDao;
import com.findee.findeeBackend.dto.LoginRequest;
import com.findee.findeeBackend.dto.LoginResponse;
import com.findee.findeeBackend.entities.Usuario;
import com.findee.findeeBackend.security.CustomAuthenticationProvider;
import com.findee.findeeBackend.security.JWTService;
import com.findee.findeeBackend.security.UserDetailsImpl;
import com.findee.findeeBackend.security.UserDetailsService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service

public class AuthService {

    private final UsuarioDao usuarioDao;
    private final JWTService jwtService;
    private final CustomAuthenticationProvider authenticationManager;
    private final UserDetailsService userDetailsService;


    public AuthService(UsuarioDao usuarioDao, JWTService jwtService, CustomAuthenticationProvider  authenticationManager, UserDetailsService userDetailsService) {
        this.usuarioDao = usuarioDao;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    public LoginResponse login(LoginRequest request) throws RuntimeException{
        // 1. Autenticar con Spring Security
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getContrasena()
                )
        );

        // Si llega aquí, la autenticación fue exitosa
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

        // 3. Generar token JWT
        String jwtToken = jwtService.generateToken(userDetails);

        //4. Buscar al usuario en la BD para obtener el nombre
        Usuario usuario = usuarioDao.findByEmail(request.getEmail());

        if(usuario == null){
            throw new UsernameNotFoundException("Usuario no encontrado");
        }
        return new LoginResponse(jwtToken, usuario.getEmail(), usuario.getNombre(), "Login exitoso", true);
    }
}
