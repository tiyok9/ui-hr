import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  onPaginationChange: (pageIndex: number, pageSize: number) => void;
}

export default function TablePagination({
  pageIndex,
  pageSize,
  pageCount,
  onPaginationChange,
}: Props) {
  return (
    <div className="flex items-center justify-between px-6 py-3 text-sm">
      <div className="flex items-center gap-2">
        Rows per page
        <select
          value={pageSize}
          onChange={(e) =>
            onPaginationChange(pageIndex, Number(e.target.value))
          }
          className="border rounded px-2 py-1 hover:cursor-pointer"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4">
        <span>
          Page {pageIndex + 1} of {pageCount}
        </span>

        <button
          disabled={pageIndex === 0}
          onClick={() => onPaginationChange(pageIndex - 1, pageSize)}
          className="p-2 border rounded hover:cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          disabled={pageIndex + 1 >= pageCount}
          onClick={() => onPaginationChange(pageIndex + 1, pageSize)}
          className="p-2 border rounded hover:cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
