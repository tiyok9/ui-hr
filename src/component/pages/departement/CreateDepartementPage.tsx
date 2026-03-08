import { useNavigate } from "react-router-dom";
import type { DepartementsFormValues } from "../../../features/departement/components/DepartementForm";
import DepartementForm from "../../../features/departement/components/DepartementForm";
import { useCreateDepartement } from "../../../features/departement/departementApi";

const CreateDepartementPage = () => {
  const navigate = useNavigate();
  const createDepartement = useCreateDepartement();

  const handleSubmit = (data: DepartementsFormValues) => {
    createDepartement.mutate(data, {
      onSuccess: () => {
        navigate("/departements");
      },
    });
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">Create Departement</h1>

      <DepartementForm
        onSubmit={handleSubmit}
        loading={createDepartement.isPending}
      />
    </div>
  );
};

export default CreateDepartementPage;
