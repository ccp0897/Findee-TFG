package com.findee.findeeBackend.security;

import com.findee.findeeBackend.entities.Usuario;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

/*
*  Clase para adaptarse a userDetails y no ensuciar la entidad
* */
public class UserDetailsImpl implements UserDetails {

    private final Usuario usuario;

    public UserDetailsImpl(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // Si no usas roles, retorna una lista vacía
    }

    @Override
    public String getPassword() {
        return usuario.getContrasena(); // Devuelve la contraseña hasheada con BCrypt
    }

    @Override
    public String getUsername() {
        return usuario.getEmail(); // Usamos el email como identificador único
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Cuenta nunca expira (ajusta si necesitas lógica de expiración)
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Cuenta nunca se bloquea (ajusta si manejas bloqueos)
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Credenciales nunca expiran
    }

    @Override
    public boolean isEnabled() {
        return true; // Cuenta siempre activa (ajusta si tienes columna "activo" en DB)
    }

    // Método adicional para obtener el usuario completo si lo necesitas
    public Usuario getUsuario() {
        return usuario;
    }
}