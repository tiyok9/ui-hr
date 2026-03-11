import { Calendar, Upload, X } from "lucide-react";
import { useTypeLeaveNoPage } from "../TypeLeaveApi";
import type { LeavePropsGetType } from "../../leaveRequest/components/LeaveRequestForm";
import { useEffect, useRef, useState } from "react";

const TypeLeaveDetail = ({
  setValue,
  type,
  register,
  errors,
  clearErrors,
  setError,
  duration,
}: LeavePropsGetType) => {
  const { data, isLoading } = useTypeLeaveNoPage();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSelect = (item: any) => {
    setValue("id_jenis_cuti", item.id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading leave types...</p>;
  }

  const selectedType = data?.data?.find((item: any) => item.id === type);

  const handleFileChange = (fileList: FileList | null) => {
    if (!fileList?.length) return;

    const file = fileList[0];

    if (!file.type.startsWith("image/")) {
      setError("img", {
        message: "File harus berupa gambar",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("img", {
        message: "Ukuran file maksimal 2MB",
      });
      return;
    }

    clearErrors("img");

    setValue("img", file);

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const removeImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setValue("img", undefined);
  };

  const { ref: attachmentRef, ...attachmentField } = register("img", {
    onChange: (e) => handleFileChange(e.target.files),
  });

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          Leave Type
        </label>

        <div className="grid md:grid-cols-3 gap-4">
          {data?.data?.length ? (
            data.data.map((item: any) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`cursor-pointer border rounded-lg p-4 transition
                ${
                  type === item.id
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div>
                  <p className="text-gray-500 text-sm">{item.jenis_cuti}</p>

                  <p className="text-2xl font-semibold">
                    {item.jatah_hari} Days
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No leave types available</p>
          )}
        </div>

        <input
          type="hidden"
          {...register("id_jenis_cuti", {
            required: "Pilih jenis cuti",
          })}
        />

        {errors?.id_jenis_cuti && (
          <p className="text-red-500 text-sm mt-2">
            {errors.id_jenis_cuti.message}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Start Date
          </label>

          <input
            type="date"
            {...register("tanggal_mulai", {
              required: "Tanggal mulai wajib diisi",
            })}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2"
          />

          {errors.tanggal_mulai && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tanggal_mulai.message}
            </p>
          )}
        </div>

        {selectedType?.require_end_date && (
          <div>
            <label className="text-sm font-medium text-gray-700">
              End Date
            </label>

            <input
              type="date"
              {...register("tanggal_selesai", {
                required: "Tanggal selesai wajib diisi",
              })}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2"
            />

            {errors.tanggal_selesai && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tanggal_selesai.message}
              </p>
            )}
          </div>
        )}
      </div>

      {selectedType?.require_end_date && duration > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center gap-3">
          <Calendar size={18} className="text-blue-600" />

          <p className="text-sm text-blue-800">
            Leave duration: <b>{duration} days</b>
          </p>
        </div>
      )}

      {selectedType?.require_attachment && (
        <div>
          <label className="text-sm font-medium text-gray-700">
            Attachment
          </label>

          {!preview && (
            <div
              className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
              ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-400"
              }`}
              onDragEnter={() => setDragActive(true)}
              onDragLeave={() => setDragActive(false)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                handleFileChange(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto text-gray-400 mb-2" size={22} />

              <p className="text-sm text-gray-600">
                Drag & drop image here or click to upload
              </p>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...attachmentField}
                ref={(e) => {
                  attachmentRef(e);
                  fileInputRef.current = e;
                }}
              />
            </div>
          )}

          {preview && (
            <div className="relative w-40 mt-4">
              <img
                src={preview}
                className="rounded-lg border shadow-sm"
                alt="preview"
              />

              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-white border rounded-full p-1 shadow hover:bg-gray-100"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {errors.img && (
            <p className="text-red-500 text-sm mt-2">{errors.img.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TypeLeaveDetail;
