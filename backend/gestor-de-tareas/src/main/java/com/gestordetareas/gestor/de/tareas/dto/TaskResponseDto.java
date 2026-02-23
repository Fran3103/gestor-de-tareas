package com.gestordetareas.gestor.de.tareas.dto;

public record TaskResponseDto(
        Long id,
        String title,
        String description,
        boolean completed
) {}
