import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import TablePagination from "./TablePagination";

interface Props<T> {
  columns: ColumnDef<T>[];
  data: T[];
  toolbar?: React.ReactNode;

  pageCount: number;
  pageIndex: number;
  pageSize: number;
  onPaginationChange: (pageIndex: number, pageSize: number) => void;
}

export default function DataTable<T>({
  columns,
  data,
  pageCount,
  pageIndex,
  pageSize,
  onPaginationChange,
  toolbar,
}: Props<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const numberedColumns: ColumnDef<T>[] = [
    {
      id: "no",
      header: "No",
      cell: ({ row }) => pageIndex * pageSize + row.index + 1,
    },
    ...columns,
  ];

  const table = useReactTable({
    data,
    columns: numberedColumns,
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
    },

    pageCount,
    manualPagination: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="bg-white border rounded-lg shadow-sm">
      {/* TABLE */}
      {toolbar && <div>{toolbar}</div>}
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="px-6 py-4 text-left font-medium text-gray-600 border-b cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}

                    {header.column.getCanSort() && (
                      <ArrowUpDown size={14} className="text-gray-400" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50 transition">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-6">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <TablePagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageCount={pageCount}
        onPaginationChange={onPaginationChange}
      />
    </div>
  );
}
