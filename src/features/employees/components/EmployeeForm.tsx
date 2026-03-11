import { useForm } from "react-hook-form";
import SelectAsync from "../../../component/form/SelectAsync";
import { useEffect } from "react";
import { usePosition } from "../employeesApi";
import ButtonSubmit from "../../../component/button/ButtonSubmit";

export type EmployeeFormValues = {
  nama: string;
  nik: string;
  no_hp: string;
  alamat: string;
  id_jabatan: string;
};

interface Props {
  defaultValues?: Partial<EmployeeFormValues>;
  onSubmit: (data: EmployeeFormValues) => void;
  loading?: boolean;
}

export default function EmployeeForm({
  defaultValues,
  onSubmit,
  loading,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    defaultValues: {
      ...defaultValues,
    },
  });
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);
  const { data: employees, isLoading } = usePosition();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 border rounded-lg p-6 bg-white"
    >
      <div>
        <label className="text-sm font-medium">Nama</label>
        <input
          {...register("nama", {
            required: "Nama is required",
            maxLength: 150,
          })}
          className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
        />
        {errors.nama && (
          <p className="text-red-500 text-xs">{errors.nama.message}</p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium">NIK</label>
        <input
          {...register("nik", {
            required: "NIK is required",
            pattern: {
              value: /^[0-9]{16}$/,
              message: "NIK must be 16 digits",
            },
          })}
          className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
        />
        {errors.nik && (
          <p className="text-red-500 text-xs">{errors.nik.message}</p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium">No HP</label>
        <input
          {...register("no_hp", {
            required: "No HP is required",
            pattern: {
              value: /^[0-9]{10,13}$/,
              message: "No HP must be 10-13 digits",
            },
          })}
          className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
        />
        {errors.no_hp && (
          <p className="text-red-500 text-xs">{errors.no_hp.message}</p>
        )}
      </div>
      <SelectAsync
        label="Position"
        loading={isLoading}
        options={employees?.data?.map((emp: any) => ({
          label: emp.nama_jabatan,
          value: emp.id,
        }))}
        register={register("id_jabatan", { required: "Position is required" })}
      />
      <div>
        <label className="text-sm font-medium">Alamat</label>
        <textarea
          {...register("alamat", { required: "Alamat is required" })}
          className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
        />
        {errors.alamat && (
          <p className="text-red-500 text-xs">{errors.alamat.message}</p>
        )}
      </div>
      <div className="flex justify-end pt-4">
        <ButtonSubmit loading={loading} text="save" />
      </div>
    </form>
  );
}
