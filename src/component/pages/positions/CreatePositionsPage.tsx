import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCreatePosition } from "../../../features/positions/positionsApi";
import PositionsForm, {
  type PositionsFormValues,
} from "../../../features/positions/components/PositionsForm";

export default function CreatePositionsPage() {
  const navigate = useNavigate();
  const createPosition = useCreatePosition();

  const handleSubmit = (data: PositionsFormValues) => {
    createPosition.mutate(data, {
      onSuccess: () => {
        navigate("/positions");
      },
    });
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">Create Position</h1>

      <PositionsForm
        onSubmit={handleSubmit}
        loading={createPosition.isPending}
      />
    </div>
  );
}
