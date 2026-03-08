import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../../../features/users/userApi";
import type { UserFormValues } from "../../../features/users/components/UserForm";
import UserForm from "../../../features/users/components/UserForm";
import toast from "react-hot-toast";

export default function CreateUserPage() {
  const navigate = useNavigate();
  const createUser = useCreateUser();

  const handleSubmit = (data: UserFormValues) => {
    createUser.mutate(data, {
      onSuccess: () => {
        toast.success("User created");
        navigate("/users");
      },
    });
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">Create User</h1>

      <UserForm onSubmit={handleSubmit} loading={createUser.isPending} />
    </div>
  );
}
