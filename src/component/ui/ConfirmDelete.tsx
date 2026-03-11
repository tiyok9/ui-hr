import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Trash2 } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
  onConfirm: () => void;
}

export default function ConfirmDelete({
  title = "Delete Data",
  description = "This action cannot be undone.",
  onConfirm,
}: Props) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="text-red-600 hover:text-red-800 hover:cursor-pointer">
          <Trash2 size={16} />
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40 z-100" />

        <AlertDialog.Content className="fixed z-101 bg-white p-6 rounded-lg shadow-lg w-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <AlertDialog.Title className="text-lg font-semibold">
            {title}
          </AlertDialog.Title>

          <AlertDialog.Description className="text-sm text-gray-500 mt-2">
            {description}
          </AlertDialog.Description>

          <div className="flex justify-end gap-2 mt-6">
            <AlertDialog.Cancel className="px-4 py-2 border rounded-md text-sm hover:cursor-pointer">
              Cancel
            </AlertDialog.Cancel>

            <AlertDialog.Action
              onClick={onConfirm}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md text-sm hover:cursor-pointer hover:from-purple-500"
            >
              Delete
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
