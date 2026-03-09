import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/axios";
import toast from "react-hot-toast";

export const useCreateLeaveRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/cuti/store", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leave-requests"],
      });
      toast.success("Leave request submitted successfully");
    },
    onError: () => {
      toast.error("Failed to submit leave request");
    },
  });
};
