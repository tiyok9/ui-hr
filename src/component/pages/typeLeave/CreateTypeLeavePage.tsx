import { useNavigate } from "react-router-dom";
import TypeLeaveForm, {
  type TypeLeaveFormValues,
} from "../../../features/typeLeave/components/TypeLeaveForm";
import { useCreateTypeLeave } from "../../../features/typeLeave/typeleaveApi";

const CreateTypeLeavePage = () => {
  const navigate = useNavigate();
  const createTypeLeave = useCreateTypeLeave();

  const handleSubmit = (data: TypeLeaveFormValues) => {
    createTypeLeave.mutate(data, {
      onSuccess: () => {
        navigate("/type-leaves");
      },
    });
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">Create Type Leave</h1>

      <TypeLeaveForm
        onSubmit={handleSubmit}
        loading={createTypeLeave.isPending}
      />
    </div>
  );
};

export default CreateTypeLeavePage;
