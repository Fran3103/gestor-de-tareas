import { TaskErrorMessage } from "../components/TaskErrorMessage";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import { TaskSearch } from "../components/TaskSearch";
import { useTasks } from "../hooks/useTasks";

export function TasksPage() {
  const {
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
  } = useTasks();

  return (
    <main className="min-h-screen bg-white px-4 py-10  ">
      <section className="mx-auto  max-w-[800px]   rounded-2xl border border-gray-400 p-5 shadow-xl">
        <header className="mb-5">
          <h1 className="text-xl font-semibold text-gray-900">Gestor de Tareas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Agregá, buscá y eliminá tareas de forma simple.
          </p>
        </header>

        <div className="space-y-3">
          <TaskForm onAddTask={addTask} isSubmitting={isSubmitting} />
          <TaskSearch
            onSearch={searchTasks}
            onClear={clearSearch}
            defaultValue={searchQuery}
          />
          <TaskErrorMessage message={error} />
        </div>

        <div className="mt-5">
          <TaskList
            tasks={tasks}
            onDeleteTask={removeTask}
            onToggleComplete={toggleTaskCompleted}
            isLoading={isLoading}
            hasSearch={Boolean(searchQuery)}
          />
        </div>
      </section>
    </main>
  );
}