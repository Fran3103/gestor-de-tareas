import { useCallback, useEffect, useState } from "react";
import { taskService } from "../services/taskService";
import type { Task } from "../types/task.types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadTasks = useCallback(async (query?: string | number) => {
    setIsLoading(true);
    setError("");

    try {
      const data = await taskService.getTasks(typeof query === "string" ? query : undefined, typeof query === "number" ? query : undefined);
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudieron cargar las tareas");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (title: string, description?: string, completed?: boolean) => {
  setIsSubmitting(true);
  setError("");

  try {
    await taskService.createTask({
      title,
      description,
      completed,
    });

    await loadTasks(searchQuery.trim() || undefined);
  } catch (err) {
    setError(err instanceof Error ? err.message : "No se pudo crear la tarea");
    throw err;
  } finally {
    setIsSubmitting(false);
  }
};

  const removeTask = async (id: number) => {
    setError("");

    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo eliminar la tarea");
    }
  };

  const searchTasks = async (query: string | number) => {
    const cleanQuery = typeof query === "string" ? query.trim() : query;
    setSearchQuery(typeof cleanQuery === "string" ? cleanQuery : "");
    await loadTasks(cleanQuery || undefined);
  };

  const clearSearch = async () => {
    setSearchQuery("");
    await loadTasks();
  };

const toggleTaskCompleted = async (rawId: number | { id: number }) => {
  setError("");

  // Normaliza por si en runtime llega objeto (por un wrapper viejo) o string
  const id =
    typeof rawId === "object" && rawId !== null
      ? Number(rawId.id)
      : Number(rawId);

  try {
    const currentTask = tasks.find((t) => Number(t.id) === id);

    if (!currentTask) {
      setError("Tarea no encontrada");
      return;
    }

    const updatedTask = await taskService.updateTask(currentTask.id, {
      title: currentTask.title,
      description: currentTask.description ?? "",
      completed: !currentTask.completed,
    });

    setTasks((prev) =>
      prev.map((t) => (Number(t.id) === id ? updatedTask : t))
    );

  } catch (err) {
    setError(err instanceof Error ? err.message : "No se pudo actualizar la tarea");
  }
};

  return {
    tasks,
    error,
    isLoading,
    isSubmitting,
    searchQuery,
    addTask,
    removeTask,
    searchTasks,
    clearSearch,
    toggleTaskCompleted,
  };
}