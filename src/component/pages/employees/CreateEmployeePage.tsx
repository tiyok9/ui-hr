import { useNavigate } from "react-router-dom";
import { useCreateEmployee } from "../../../features/employees/employeesApi";
import type { EmployeeFormValues } from "../../../features/employees/components/EmployeeForm";
import EmployeeForm from "../../../features/employees/components/EmployeeForm";

const CreateEmployeePage = () => {
  const navigate = useNavigate();
  const createEmployee = useCreateEmployee();

  const handleSubmit = (data: EmployeeFormValues) => {
    createEmployee.mutate(data, {
      onSuccess: () => {
        navigate("/employees");
      },
    });
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">Create Employee</h1>

      <EmployeeForm
        onSubmit={handleSubmit}
        loading={createEmployee.isPending}
      />
    </div>
  );
};

export default CreateEmployeePage;
