import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/axios";
import toast from "react-hot-toast";

export const useScanAttendance = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/absensi/store", data);
      return res.data;
    },
    onError: () => {
      toast.error("Failed to scan attendance");
    },
  });
};
