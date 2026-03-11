import { useEffect } from "react";
import {
  useForm,
  useWatch,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import TypeLeaveDetail from "../../typeLeave/components/TypeLeaveDetail";
import ButtonSubmit from "../../../component/button/ButtonSubmit";

export type LeaveRequestFormValues = {
  id_jenis_cuti: string;
  tanggal_mulai: string;
  tanggal_selesai?: string;
  alasan: string;
  img?: File;
};

interface Props {
  defaultValues?: Partial<LeaveRequestFormValues>;
  onSubmit: (data: LeaveRequestFormValues) => void;
  loading?: boolean;
}

export type LeavePropsGetType = {
  setValue: UseFormSetValue<LeaveRequestFormValues>;
  type?: string;
  register: UseFormRegister<LeaveRequestFormValues>;
  errors: FieldErrors<LeaveRequestFormValues>;
  setError: any;
  clearErrors: any;
  duration: number;
};

export default function LeaveRequestForm({
  defaultValues,
  onSubmit,
  loading,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LeaveRequestFormValues>({
    defaultValues,
  });

  const start = useWatch({ control, name: "tanggal_mulai" });
  const end = useWatch({ control, name: "tanggal_selesai" });
  const type = useWatch({ control, name: "id_jenis_cuti" });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const calculateDuration = () => {
    if (!start || !end) return 0;

    const startDate = new Date(start);
    const endDate = new Date(end);

    return (
      Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1
    );
  };

  const duration = calculateDuration();

  const handleFormSubmit = (data: LeaveRequestFormValues) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8"
    >
      <h2 className="text-xl font-semibold text-gray-800">Leave Request</h2>

      <TypeLeaveDetail
        errors={errors}
        register={register}
        setValue={setValue}
        type={type}
        clearErrors={clearErrors}
        setError={setError}
        duration={duration}
      />

      <div>
        <label className="text-sm font-medium text-gray-700">Reason</label>

        <textarea
          {...register("alasan", {
            required: "Alasan cuti wajib diisi",
          })}
          rows={4}
          className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2"
        />
      </div>

      <div className="flex justify-end pt-4">
        <ButtonSubmit loading={loading} text="save" />
      </div>
    </form>
  );
}
