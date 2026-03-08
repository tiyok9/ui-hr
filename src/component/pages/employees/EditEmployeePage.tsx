import { useParams, useNavigate } from "react-router-dom";
import {
  useEmployee,
  useUpdateEmployee,
} from "../../../features/employees/employeesApi";
import EmployeeFormSkeleton from "../../../features/employees/components/EmployeeFormSkeleton";
import type { EmployeeFormValues } from "../../../features/employees/components/EmployeeForm";
import EmployeeForm from "../../../features/employees/components/EmployeeForm";

export default function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const employeId = String(id);
  const { data, isLoading } = useEmployee(employeId);
  const updateEmployee = useUpdateEmployee();
  if (isLoading) {
    return <EmployeeFormSkeleton />;
  }

  const handleSubmit = (form: EmployeeFormValues) => {
    updateEmployee.mutate(
      {
        id: employeId,
        data: form,
      },
      {
        onSuccess: () => {
          navigate("/employees");
        },
      },
    );
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">Edit Employee</h1>

      <EmployeeForm
        defaultValues={data.data}
        onSubmit={handleSubmit}
        loading={updateEmployee.isPending}
      />
    </div>
  );
}
