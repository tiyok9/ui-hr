import { Pencil } from "lucide-react";
import ConfirmDelete from "../ui/ConfirmDelete";

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TableActions({ onEdit, onDelete }: Props) {
  return (
    <div className="flex items-center gap-3">
      {onEdit && (
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 hover:cursor-pointer"
        >
          <Pencil size={16} />
        </button>
      )}

      {onDelete && <ConfirmDelete onConfirm={onDelete} />}
    </div>
  );
}
