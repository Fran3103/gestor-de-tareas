import {  useState } from "react";

type TaskSearchProps = {
  onSearch: (query: string) => Promise<void> | void;
  onClear: () => Promise<void> | void;
  defaultValue?: string;
};

export function TaskSearch({
  onSearch,
  onClear,
  defaultValue = "",
}: TaskSearchProps) {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await onSearch(query);
  };

  const handleClear = async () => {
    setQuery("");
    await onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por título..."
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
      />

      <button
        type="submit"
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      >
        Buscar
      </button>

      <button
        type="button"
        onClick={handleClear}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      >
        Limpiar
      </button>
    </form>
  );
}