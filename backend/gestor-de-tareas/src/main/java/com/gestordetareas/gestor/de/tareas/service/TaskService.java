package com.gestordetareas.gestor.de.tareas.service;

import com.gestordetareas.gestor.de.tareas.dto.TaskRequestDto;
import com.gestordetareas.gestor.de.tareas.dto.TaskResponseDto;

import java.util.List;

public interface TaskService {

    TaskResponseDto findByTitle(String title);

    TaskResponseDto findById(Long id);

    List<TaskResponseDto> findAll();

    TaskResponseDto update(Long id, TaskRequestDto Dto);

    TaskResponseDto save(TaskRequestDto Dto);

    void deleteById(Long id);


}
