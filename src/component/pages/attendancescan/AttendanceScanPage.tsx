import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useScanAttendance } from "../../../features/attendance/attendaceApi";

type Employee = {
  nik: string;
  name: string;
  jabatan: string;
};

type AttendanceFormValues = {
  nik: string;
};

export default function AttendanceScanPage() {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const attendanceScan = useScanAttendance();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [success, setSuccess] = useState(false);
  const [nikInput, setNikInput] = useState("");

  const handleSubmit = (data: AttendanceFormValues) => {
    attendanceScan.mutate(data, {
      onSuccess: (res: any) => {
        toast.success("Attendance scanned successfully");
        if (res?.data) {
          setEmployee(res.data);
        }

        setSuccess(true);

        scannerRef.current?.clear();
      },
    });
  };

  const onScanSuccess = (decodedText: string) => {
    handleSubmit({ nik: decodedText });
  };

  const onScanError = () => {
    toast.error("Failed to read QR code. Please try again.");
  };

  useEffect(() => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "scanner",
        {
          fps: 10,
          qrbox: 250,
        },
        false,
      );

      scannerRef.current.render(onScanSuccess, onScanError);
    }

    return () => {
      scannerRef.current?.clear();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Employee Check-in
          </h1>
          <p className="text-sm text-gray-500">
            Scan QR code or enter NIK manually
          </p>
        </div>

        {!success && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div id="scanner" />

            <div className="text-center text-sm text-gray-400">OR</div>

            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit({ nik: nikInput });
              }}
            >
              <input
                value={nikInput}
                disabled={attendanceScan.isPending}
                onChange={(e) => setNikInput(e.target.value)}
                placeholder="Enter Employee NIK"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="submit"
                disabled={attendanceScan.isPending}
                className="w-full bg-gradient-to-r text-white py-2 rounded-lg transition from-purple-600 to-indigo-600 hover:from-purple-500 hover:cursor-pointer"
              >
                {attendanceScan.isPending ? "Prosess...." : "Check-in"}
              </button>
            </form>
          </div>
        )}

        {success && employee && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-50 border border-green-200 rounded-xl p-6 space-y-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white text-2xl"
            >
              ✓
            </motion.div>

            <div>
              <h2 className="text-xl font-semibold text-green-700">
                Check-in Successful
              </h2>

              <p className="text-sm text-green-600">
                Attendance recorded successfully
              </p>
            </div>

            <div className="bg-white border rounded-lg p-4 flex items-center gap-4 shadow-sm">
              <div className="bg-gray-100 p-3 rounded-full">
                <User size={24} />
              </div>

              <div className="text-left">
                <p className="font-semibold text-gray-800">{employee.name}</p>

                <p className="text-sm text-gray-500">NIK: {employee.nik}</p>

                <p className="text-sm text-gray-500">{employee.jabatan}</p>
              </div>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 hover:cursor-pointer"
            >
              Scan Next Employee
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
