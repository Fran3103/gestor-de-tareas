package com.gestordetareas.gestor.de.tareas.exception;

import java.time.LocalDateTime;
import java.util.Map;

public record ApiErrorResponse(
        String message,
        int status,
        LocalDateTime timestamp,
        Map<String, String> errors) {


    public static ApiErrorResponse newInstance(String message, int status) {
        return new ApiErrorResponse(message, status, LocalDateTime.now(), null);
    }

    public static ApiErrorResponse newInstance(String message, int status, Map<String, String> errors) {
        return new ApiErrorResponse(message, status, LocalDateTime.now(), errors);
    }
}
