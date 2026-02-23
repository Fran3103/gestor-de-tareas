package com.gestordetareas.gestor.de.tareas.service.impl;

import com.gestordetareas.gestor.de.tareas.dto.TaskRequestDto;
import com.gestordetareas.gestor.de.tareas.dto.TaskResponseDto;
import com.gestordetareas.gestor.de.tareas.entity.Task;
import com.gestordetareas.gestor.de.tareas.exception.BadRequestException;
import com.gestordetareas.gestor.de.tareas.repository.TaskRepository;
import com.gestordetareas.gestor.de.tareas.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    final private TaskRepository taskRepository;


    @Override
    public TaskResponseDto findByTitle(String title) {
        Task task = taskRepository.findByTitle(title);

        if (task == null) {
             throw new BadRequestException("No se encontro el task con el titulo: " + title);
        }

        return new TaskResponseDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.isCompleted()
        );

    }

    @Override
    public TaskResponseDto findById(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new BadRequestException("No se encontro el task con el id: " + id));

        return new TaskResponseDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.isCompleted()
        );
    }

    @Override
    public List<TaskResponseDto> findAll() {
        return taskRepository.findAll().stream()
                .map(task -> new TaskResponseDto(
                        task.getId(),
                        task.getTitle(),
                        task.getDescription(),
                        task.isCompleted()
                ))
                .toList();
    }

    @Override
    public TaskResponseDto update(Long id, TaskRequestDto Dto) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new BadRequestException("No se encontro el task con el id: " + id));

        task.setTitle(Dto.title() != null ? Dto.title() : task.getTitle());
        task.setDescription(Dto.description() != null ? Dto.description() : task.getDescription());
        task.setCompleted(Dto.completed());

        Task updatedTask = taskRepository.save(task);

        return new TaskResponseDto(
                updatedTask.getId(),
                updatedTask.getTitle(),
                updatedTask.getDescription(),
                updatedTask.isCompleted()
        );
    }

    @Override
    public TaskResponseDto save(TaskRequestDto Dto) {
        Task taskNew = taskRepository.findByTitle(Dto.title());
        if (taskNew != null) {
            throw new BadRequestException("Ya existe un task con el titulo: " + Dto.title());
        }

        Task task = new Task();
        task.setTitle(Dto.title());
        task.setDescription(Dto.description());
        task.setCompleted(Dto.completed());

        Task savedTask = taskRepository.save(task);

        return new TaskResponseDto(
                savedTask.getId(),
                savedTask.getTitle(),
                savedTask.getDescription(),
                savedTask.isCompleted()
        );
    }

    @Override
    public void deleteById(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(
                () -> new BadRequestException("No se encontro el task con el id: " + id));

        taskRepository.delete(task);

    }
}
