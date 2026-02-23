package com.gestordetareas.gestor.de.tareas.dto;

import jakarta.validation.constraints.NotBlank;

public record TaskRequestDto(
        @NotBlank(message = "Title cannot be blank") String title,
        String description,
        boolean completed
) {}
