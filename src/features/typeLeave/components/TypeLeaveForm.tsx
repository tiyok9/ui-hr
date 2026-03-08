import { useForm } from "react-hook-form";
import { useEffect } from "react";

export type TypeLeaveFormValues = {
  jenis_cuti: string;
};

interface Props {
  defaultValues?: Partial<TypeLeaveFormValues>;
  onSubmit: (data: TypeLeaveFormValues) => void;
  loading?: boolean;
}

export default function TypeLeaveForm({
  defaultValues,
  onSubmit,
  loading,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeLeaveFormValues>({
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
        <label className="text-sm font-medium">Type Leave </label>

        <input
          {...register("jenis_cuti", {
            required: "Jenis cuti is required",
          })}
          className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
        />

        {errors.jenis_cuti && (
          <p className="text-red-500 text-xs">{errors.jenis_cuti.message}</p>
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
