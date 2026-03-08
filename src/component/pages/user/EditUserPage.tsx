import { useParams, useNavigate } from "react-router-dom";
import { useUpdateUser, useUser } from "../../../features/users/userApi";
import type { UserFormValues } from "../../../features/users/components/UserForm";
import UserForm from "../../../features/users/components/UserForm";
import UserFormSkeleton from "../../../features/users/components/UserFormSkeleton";

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const userId = String(id);
  const { data, isLoading } = useUser(userId);
  const updateUser = useUpdateUser();
  if (isLoading) {
    return <UserFormSkeleton />;
  }

  const handleSubmit = (form: UserFormValues) => {
    updateUser.mutate(
      {
        id: userId,
        data: form,
      },
      {
        onSuccess: () => {
          navigate("/users");
        },
      },
    );
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6">Edit User</h1>

      <UserForm
        defaultValues={data.data}
        onSubmit={handleSubmit}
        loading={updateUser.isPending}
      />
    </div>
  );
}
