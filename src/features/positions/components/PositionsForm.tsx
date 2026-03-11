import { useForm } from "react-hook-form";
import SelectAsync from "../../../component/form/SelectAsync";
import { useEffect } from "react";
import { useDepartements } from "../positionsApi";
import ButtonSubmit from "../../../component/button/ButtonSubmit";

export type PositionsFormValues = {
  jabatan: string;
  id_departemen: string;
};

interface Props {
  defaultValues?: Partial<PositionsFormValues>;
  onSubmit: (data: PositionsFormValues) => void;
  loading?: boolean;
}

export default function PositionsForm({
  defaultValues,
  onSubmit,
  loading,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PositionsFormValues>({
    defaultValues: {
      ...defaultValues,
    },
  });
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);
  const { data: employees, isLoading } = useDepartements();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 border rounded-lg p-6 bg-white"
    >
      <div>
        <label className="text-sm font-medium">Nama Jabatan</label>

        <input
          {...register("jabatan", {
            required: "Nama jabatan is required",
          })}
          className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
        />

        {errors.jabatan && (
          <p className="text-red-500 text-xs">{errors.jabatan.message}</p>
        )}
      </div>

      <SelectAsync
        label="Departemen"
        loading={isLoading}
        options={employees?.data?.map((emp: any) => ({
          label: emp.nama_departemen,
          value: emp.id,
        }))}
        register={register("id_departemen")}
      />

      <div className="flex justify-end pt-4">
        <ButtonSubmit loading={loading} text="save" />
      </div>
    </form>
  );
}
