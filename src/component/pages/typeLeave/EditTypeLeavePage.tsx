import { useParams, useNavigate } from "react-router-dom";
import EmployeeFormSkeleton from "../../../features/employees/components/EmployeeFormSkeleton";
import {
  useTypeLeave,
  useUpdateTypeLeave,
} from "../../../features/typeLeave/TypeLeaveApi";
import type { TypeLeaveFormValues } from "../../../features/typeLeave/components/TypeLeaveForm";
import TypeLeaveForm from "../../../features/typeLeave/components/TypeLeaveForm";

export default function EditTypeLeavePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const typeLeaveId = String(id);
  const { data, isLoading } = useTypeLeave(typeLeaveId);
  const updateTypeLeave = useUpdateTypeLeave();
  if (isLoading) {
    return <EmployeeFormSkeleton />;
  }

  const handleSubmit = (form: TypeLeaveFormValues) => {
    updateTypeLeave.mutate(
      {
        id: typeLeaveId,
        data: form,
      },
      {
        onSuccess: () => {
          navigate("/type-leaves");
        },
      },
    );
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">Edit Type Leave</h1>

      <TypeLeaveForm
        defaultValues={data.data}
        onSubmit={handleSubmit}
        loading={updateTypeLeave.isPending}
      />
    </div>
  );
}
