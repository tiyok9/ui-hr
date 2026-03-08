import Skeleton from "./Skeleton";

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  label?: string;
  options?: Option[];
  loading?: boolean;
  placeholder?: string;
  register?: any;
}

export default function SelectAsync({
  label,
  options = [],
  loading,
  placeholder = "Select",
  register,
}: Props) {
  if (loading) {
    return (
      <div className="space-y-2">
        {label && <Skeleton className="h-4 w-24" />}
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div>
      {label && <label className="text-sm font-medium">{label}</label>}

      <select
        {...register}
        className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
      >
        <option value="">{placeholder}</option>

        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
