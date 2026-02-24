type TaskEmptyStateProps = {
  hasSearch?: boolean;
};

export function TaskEmptyState({ hasSearch = false }: TaskEmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
      {hasSearch ? "No se encontraron tareas con ese título." : "No hay tareas todavía."}
    </div>
  );
}