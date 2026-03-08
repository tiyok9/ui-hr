import { useParams, useNavigate } from "react-router-dom";
import UserFormSkeleton from "../../../features/users/components/UserFormSkeleton";
import {
  usePosition,
  useUpdatePosition,
} from "../../../features/positions/positionsApi";
import PositionsForm, {
  type PositionsFormValues,
} from "../../../features/positions/components/PositionsForm";

export default function EditPositionsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const positionId = String(id);
  const { data, isLoading } = usePosition(positionId);
  const updatePosition = useUpdatePosition();
  if (isLoading) {
    return <UserFormSkeleton />;
  }
  const handleSubmit = (form: PositionsFormValues) => {
    updatePosition.mutate(
      {
        id: positionId,
        data: form,
      },
      {
        onSuccess: () => {
          navigate("/positions");
        },
      },
    );
  };
  const mapPositionToForm = (data: any) => ({
    jabatan: data.nama_jabatan,
  });
  return (
    <div className="mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">Edit Position</h1>

      <PositionsForm
        defaultValues={mapPositionToForm(data.data)}
        onSubmit={handleSubmit}
        loading={updatePosition.isPending}
      />
    </div>
  );
}
