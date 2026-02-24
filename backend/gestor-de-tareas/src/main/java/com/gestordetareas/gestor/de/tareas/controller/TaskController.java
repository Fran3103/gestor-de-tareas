package com.gestordetareas.gestor.de.tareas.controller;


import com.gestordetareas.gestor.de.tareas.dto.TaskRequestDto;
import com.gestordetareas.gestor.de.tareas.dto.TaskResponseDto;
import com.gestordetareas.gestor.de.tareas.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class TaskController {

    final private TaskService taskService;


    @GetMapping()
    public ResponseEntity<List<TaskResponseDto>> find(
            @RequestParam (required = false) String title,
            @RequestParam (required = false) Long id
    ) {
        if (title != null) {
            return ResponseEntity.ok(List.of(taskService.findByTitle(title)));
        }
        if (id != null) {
            return ResponseEntity.ok(List.of(taskService.findById(id)));
        }
        return ResponseEntity.ok(taskService.findAll());
    }

    @PostMapping()
    public ResponseEntity<TaskResponseDto> save(@Valid @RequestBody TaskRequestDto Dto) {
        TaskResponseDto savedTask = taskService.save(Dto);
        return ResponseEntity.ok(savedTask);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TaskResponseDto> update(@PathVariable Long id, @RequestBody TaskRequestDto Dto) {
        TaskResponseDto updatedTask = taskService.update(id, Dto);
        return ResponseEntity.ok(updatedTask);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        taskService.deleteById(id);
        return ResponseEntity.ok("task eliminada correctamente");
    }
}
