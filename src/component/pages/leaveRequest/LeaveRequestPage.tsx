import { useNavigate } from "react-router-dom";
import { useCreateLeaveRequest } from "../../../features/leaveRequest/leaveRequestApi";
import type { LeaveRequestFormValues } from "../../../features/leaveRequest/components/LeaveRequestForm";
import LeaveRequestForm from "../../../features/leaveRequest/components/LeaveRequestForm";
import { ArrowLeft } from "lucide-react";

export default function LeaveRequestPage() {
  const navigate = useNavigate();
  const createLeaveRequest = useCreateLeaveRequest();

  const handleSubmit = (data: LeaveRequestFormValues) => {
    createLeaveRequest.mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Leave Balance</h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm">Annual Leave</p>
              <p className="text-2xl font-semibold">10 Days</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Remaining</p>
              <p className="text-2xl font-semibold text-green-600">6 Days</p>
            </div>
          </div>
        </div>
        <LeaveRequestForm
          onSubmit={handleSubmit}
          loading={createLeaveRequest.isPending}
        />
      </div>
    </div>
  );
}
