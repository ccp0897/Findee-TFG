package com.findee.findeeBackend.security;

import com.findee.findeeBackend.dao.UsuarioDao;
import com.findee.findeeBackend.entities.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private final UsuarioDao usuarioDao;

    public UserDetailsServiceImpl(UsuarioDao usuarioDao) {
        this.usuarioDao = usuarioDao;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        //Buscar el usuario por email
        Usuario usuario = usuarioDao.findByEmail(email);
        if(usuario == null){
            throw new UsernameNotFoundException("El email no es válido");
        }

        //Convertir el usuario a UserDetails
        return new UserDetailsImpl(usuario);

    }
}
