import { useParams, useNavigate } from "react-router-dom";
import EmployeeFormSkeleton from "../../../features/employees/components/EmployeeFormSkeleton";
import {
  useDepartement,
  useUpdateDepartement,
} from "../../../features/departement/departementApi";
import DepartementForm, {
  type DepartementsFormValues,
} from "../../../features/departement/components/DepartementForm";

export default function EditDepartementPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const departemenId = String(id);
  const { data, isLoading } = useDepartement(departemenId);
  const updateDepartement = useUpdateDepartement();
  if (isLoading) {
    return <EmployeeFormSkeleton />;
  }

  const handleSubmit = (form: DepartementsFormValues) => {
    updateDepartement.mutate(
      {
        id: departemenId,
        data: form,
      },
      {
        onSuccess: () => {
          navigate("/departements");
        },
      },
    );
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">Edit Departement</h1>

      <DepartementForm
        defaultValues={data.data}
        onSubmit={handleSubmit}
        loading={updateDepartement.isPending}
      />
    </div>
  );
}
