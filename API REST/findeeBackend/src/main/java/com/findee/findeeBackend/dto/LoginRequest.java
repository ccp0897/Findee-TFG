package com.findee.findeeBackend.dto;


public class LoginRequest {
    public String email;
    public String contrasena;

    public LoginRequest() {
    }
    public LoginRequest(String email, String password) {
        this.email = email;
        this.contrasena = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String password) {
        this.contrasena = password;
    }
}
