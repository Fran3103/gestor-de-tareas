package com.gestordetareas.gestor.de.tareas.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiErrorResponse> handleBadRequest(BadRequestException ex) {
       return ResponseEntity
               .status(HttpStatus.BAD_REQUEST)
               .body(ApiErrorResponse.newInstance(ex.getMessage(), HttpStatus.BAD_REQUEST.value()));
    }


    @ExceptionHandler(ResourceNotFoundException.class)
    public  ResponseEntity<ApiErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ApiErrorResponse.newInstance(ex.getMessage(), HttpStatus.NOT_FOUND.value()));
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public  ResponseEntity<ApiErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new LinkedHashMap<>();
        ex.getBindingResult().getFieldErrors().forEach((fieldError) -> {
            errors.put(fieldError.getField(), fieldError.getDefaultMessage());
        });
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiErrorResponse.newInstance("Validation failed",
                        HttpStatus.BAD_REQUEST.value(), errors));
    }


    @ExceptionHandler(Exception.class)
    public  ResponseEntity<ApiErrorResponse> handleException(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiErrorResponse.newInstance("An unexpected error occurred",
                        HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }

}
