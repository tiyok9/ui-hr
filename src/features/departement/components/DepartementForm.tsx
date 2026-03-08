import { useForm } from "react-hook-form";
import { useEffect } from "react";

export type DepartementsFormValues = {
  departemen: string;
};

interface Props {
  defaultValues?: Partial<DepartementsFormValues>;
  onSubmit: (data: DepartementsFormValues) => void;
  loading?: boolean;
}

export default function DepartementForm({
  defaultValues,
  onSubmit,
  loading,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartementsFormValues>({
    defaultValues: {
      ...defaultValues,
    },
  });
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 border rounded-lg p-6 bg-white"
    >
      <div>
        <label className="text-sm font-medium">Nama Departement</label>

        <input
          {...register("departemen", {
            required: "Nama departemen is required",
          })}
          className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
        />

        {errors.departemen && (
          <p className="text-red-500 text-xs">{errors.departemen.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
