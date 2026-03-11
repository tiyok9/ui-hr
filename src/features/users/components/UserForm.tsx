import { useForm } from "react-hook-form";
import { useEmployees } from "../userApi";
import SelectAsync from "../../../component/form/SelectAsync";
import { useEffect } from "react";
import ButtonSubmit from "../../../component/button/ButtonSubmit";

export type UserFormValues = {
  username: string;
  password: string;
  role: string;
  id_karyawan: string;
};

interface Props {
  defaultValues?: Partial<UserFormValues>;
  onSubmit: (data: UserFormValues) => void;
  loading?: boolean;
}

export default function UserForm({ defaultValues, onSubmit, loading }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: {
      ...defaultValues,
    },
  });
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);
  const { data: employees, isLoading } = useEmployees();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 border rounded-lg p-6 bg-white"
    >
      <div>
        <label className="text-sm font-medium">Username</label>

        <input
          {...register("username", { required: "Username is required" })}
          className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
        />

        {errors.username && (
          <p className="text-red-500 text-xs">{errors.username.message}</p>
        )}
      </div>

      <SelectAsync
        label="Karyawan"
        loading={isLoading}
        options={employees?.data?.map((emp: any) => ({
          label: emp.nama,
          value: emp.id,
        }))}
        register={register("id_karyawan")}
      />

      <div>
        <label className="text-sm font-medium">Role</label>

        <select
          {...register("role", { required: "Role is required" })}
          className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
        >
          <option value="">Select Role</option>
          <option value="admin">Admin HR</option>
          <option value="user">Karyawan</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div className="flex justify-end pt-4">
        <ButtonSubmit loading={loading} text="save" />
      </div>
    </form>
  );
}
