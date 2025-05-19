package com.findee.findeeBackend.dto;

public class LoginResponse {
    private String token;
    private String email;
    private String nombre;
    private String message;
    private boolean success;
    private Integer id;
    public LoginResponse() {
    }

    public LoginResponse(String token, String email, String nombre, String message, boolean success, Integer id) {
        this.token = token;
        this.email = email;
        this.nombre = nombre;
        this.message = message;
        this.success = success;
        this.id = id;
    }

    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public boolean isSuccess() {
        return success;
    }
    public void setSuccess(boolean success) {
        this.success = success;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
