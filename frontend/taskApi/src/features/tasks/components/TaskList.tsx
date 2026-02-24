import { TaskEmptyState } from "./TaskEmptyState";
import { TaskItem } from "./TaskItem";
import type { Task } from "../types/task.types";

type TaskListProps = {
  tasks: Task[];
  onDeleteTask: (id: number) => Promise<void> | void;
  isLoading?: boolean;
  hasSearch?: boolean;
  onToggleComplete: (id: number) => Promise<void> | void;
};

export function TaskList({
  tasks,
  onDeleteTask,
  isLoading = false,
  hasSearch = false,
  onToggleComplete
}: TaskListProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-500">
        Cargando tareas...
      </div>
    );
  }

  if (tasks.length === 0) {
    return <TaskEmptyState hasSearch={hasSearch} />;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDeleteTask} onToggleComplete={onToggleComplete} />
      ))}
    </ul>
  );
}