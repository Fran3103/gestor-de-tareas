import type { Task } from "../types/task.types";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type TaskItemProps = {
  task: Task;
  onDelete: (id: number) => Promise<void> | void;
  onToggleComplete: (id: number) => Promise<void> | void;
};

export function TaskItem({ task, onDelete, onToggleComplete }: TaskItemProps) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-lg border shadow-sm  px-3 py-2">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span
            className={`text-sm ${
              task.completed ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            {task.title}
          </span>

          {task.description && (
            <span className={`text-sm ${
              task.completed ? "text-gray-400 line-through" : "text-gray-200"
            }`}>{task.description}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`${
              task.completed ? "shrink-0 rounded-md bg-green-200 px-3 py-1.5 text-xs font-medium text-white" : "shrink-0 rounded-md bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
            }  transition hover:bg-green-600`}
        >
          <FaCheckCircle />
        </button>   
        <button
          onClick={() => onDelete(task.id)}
          className="shrink-0 rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-600"
        >
        <MdDelete />
        </button>
      </div>
    </li>
  );
}
