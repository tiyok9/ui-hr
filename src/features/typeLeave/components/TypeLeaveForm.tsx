import { useForm } from "react-hook-form";
import { useEffect } from "react";

export type TypeLeaveFormValues = {
  jenis_cuti: string;
  jatah_hari: number;
  require_end_date: boolean;
  require_attachment: boolean;
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
    watch,
    setValue,
    formState: { errors },
  } = useForm<TypeLeaveFormValues>({
    defaultValues: {
      jenis_cuti: "",
      jatah_hari: 0,
      require_end_date: false,
      require_attachment: false,
      ...defaultValues,
    },
  });

  const requireEndDate = watch("require_end_date");
  const requireAttachment = watch("require_attachment");

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
        <label className="block text-sm font-medium text-gray-700">
          Leave Type
        </label>

        <input
          {...register("jenis_cuti", {
            required: "Jenis cuti is required",
          })}
          placeholder="Example: Cuti Tahunan"
          className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        {errors.jenis_cuti && (
          <p className="text-red-500 text-xs mt-1">
            {errors.jenis_cuti.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Leave Quota (Days)
        </label>

        <input
          type="number"
          {...register("jatah_hari", {
            required: "Jatah hari wajib diisi",
            valueAsNumber: true,
          })}
          placeholder="12"
          className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        {errors.jatah_hari && (
          <p className="text-red-500 text-xs mt-1">
            {errors.jatah_hari.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between border rounded-lg p-3">
        <div>
          <p className="text-sm font-medium text-gray-800">Require End Date</p>
          <p className="text-xs text-gray-500">
            User must select end date when requesting leave
          </p>
        </div>

        <button
          type="button"
          onClick={() => setValue("require_end_date", !requireEndDate)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
            requireEndDate ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
              requireEndDate ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between border rounded-lg p-3">
        <div>
          <p className="text-sm font-medium text-gray-800">
            Require Attachment
          </p>
          <p className="text-xs text-gray-500">
            User must upload supporting document
          </p>
        </div>

        <button
          type="button"
          onClick={() => setValue("require_attachment", !requireAttachment)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
            requireAttachment ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
              requireAttachment ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="flex justify-end pt-4 ">
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Leave Type"}
        </button>
      </div>
    </form>
  );
}
