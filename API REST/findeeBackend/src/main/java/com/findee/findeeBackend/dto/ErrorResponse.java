package com.findee.findeeBackend.dto;

public record ErrorResponse (
        String message,
        String errorType,
        boolean success
){}
