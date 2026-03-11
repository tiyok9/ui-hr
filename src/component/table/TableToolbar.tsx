import { Search, Plus, Download } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onAdd?: () => void;
  onExport?: () => void;
}

export default function TableToolbar({
  search,
  onSearchChange,
  onAdd,
  onExport,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-6 py-4 border-b">
      <div>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder="Search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-3 py-2 border rounded-md text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onExport && (
          <button
            onClick={onExport}
            className="flex hover:cursor-pointer items-center gap-2 border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md text-sm"
          >
            <Download size={16} />
            Export CSV
          </button>
        )}

        {onAdd && (
          <button
            onClick={onAdd}
            className="flex hover:cursor-pointer items-center gap-2 bg-gradient-to-r from-purple-600 hover:from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-md text-sm justify-center"
          >
            <Plus size={16} />
            Create Data
          </button>
        )}
      </div>
    </div>
  );
}
