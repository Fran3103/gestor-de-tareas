import { useState } from "react";

type TaskFormProps = {
  onAddTask: (title: string, description?: string, completed?: boolean) => Promise<void> | void;
  isSubmitting?: boolean;
};

export function TaskForm({ onAddTask, isSubmitting = false }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    console.log("Submitting task:", { title: cleanTitle, description, completed });
    await onAddTask(cleanTitle, description, completed);

    setTitle("");
    setDescription("");
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 bg-slate-500 p-4 rounded-lg mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva tarea..."
        className="flex-1 rounded-lg border border-gray-500 px-3 py-2 text-sm outline-none focus:border-indigo-500"
      />

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción..."
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
      />

     

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Agregando..." : "Agregar"}
      </button>
    </form>
  );
}