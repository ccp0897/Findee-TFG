package com.findee.findeeBackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuración global de CORS para permitir comunicación entre el frontend Angular
 * (generalmente en http://localhost:4200) y el backend Spring Boot.
 *
 * Esta configuración permite:
 * - Peticiones desde el origen especificado
 * - Métodos HTTP comunes (GET, POST, PUT, DELETE)
 * - Envío de credenciales (necesario para autenticación)
 */

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200") // URL de tu frontend Angular
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
