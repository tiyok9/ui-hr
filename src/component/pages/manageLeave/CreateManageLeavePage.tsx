import { useNavigate } from "react-router-dom";
import { useCreateManageLeave } from "../../../features/manageLeave/typeManageLeaveApi";
import ManageLeaveForm, {
  type ManageLeaveFormValues,
} from "../../../features/manageLeave/components/ManageTypeLeaveForm";

const CreateManageLeavePage = () => {
  const navigate = useNavigate();
  const createManageLeave = useCreateManageLeave();

  const handleSubmit = (data: ManageLeaveFormValues) => {
    createManageLeave.mutate(data, {
      onSuccess: () => {
        navigate("/manage-leaves");
      },
    });
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">Create ManageLeave</h1>

      <ManageLeaveForm
        onSubmit={handleSubmit}
        loading={createManageLeave.isPending}
      />
    </div>
  );
};

export default CreateManageLeavePage;
