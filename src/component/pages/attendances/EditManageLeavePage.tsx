import { useParams, useNavigate } from "react-router-dom";
import {
  useManageLeave,
  useUpdateManageLeave,
} from "../../../features/manageLeave/typeManageLeaveApi";
import TypeManageLeaveFormSkeleton from "../../../features/manageLeave/components/TypeManageLeaveFormSkeleton";
import type { ManageLeaveFormValues } from "../../../features/manageLeave/components/ManageTypeLeaveForm";
import ManageLeaveForm from "../../../features/manageLeave/components/ManageTypeLeaveForm";

export default function EditManageLeavePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const departemenId = String(id);
  const { data, isLoading } = useManageLeave(departemenId);
  const updateDepartement = useUpdateManageLeave();
  if (isLoading) {
    return <TypeManageLeaveFormSkeleton />;
  }

  const handleSubmit = (form: ManageLeaveFormValues) => {
    updateDepartement.mutate(
      {
        id: departemenId,
        data: form,
      },
      {
        onSuccess: () => {
          navigate("/manage-leaves");
        },
      },
    );
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">Edit ManageLeave</h1>

      <ManageLeaveForm
        defaultValues={data.data}
        onSubmit={handleSubmit}
        loading={updateDepartement.isPending}
      />
    </div>
  );
}
