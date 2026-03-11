import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface Props {
  title?: string;
  description?: string;
  onConfirm: () => void;
  trigger: React.ReactNode;
}

export default function ConfirmUpdate({
  title = "Update Data",
  description = "Are you sure you want to update this data?",
  onConfirm,
  trigger,
}: Props) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40 z-50" />

        <AlertDialog.Content className="fixed z-50 bg-white p-6 rounded-lg shadow-lg w-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <AlertDialog.Title className="text-lg font-semibold">
            {title}
          </AlertDialog.Title>

          <AlertDialog.Description className="text-sm text-gray-500 mt-2">
            {description}
          </AlertDialog.Description>

          <div className="flex justify-end gap-2 mt-6">
            <AlertDialog.Cancel className="px-4 py-2 border rounded-md text-sm hover:cursor-pointer hover:bg-gray-100">
              Cancel
            </AlertDialog.Cancel>

            <AlertDialog.Action
              onClick={onConfirm}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md text-sm hover:from-purple-500 hover:cursor-pointer"
            >
              Confirm
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
