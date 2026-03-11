import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/axios";
import toast from "react-hot-toast";

export const useTypeLeaves = (
  page: number,
  perPage: number,
  search: string,
) => {
  return useQuery({
    queryKey: ["type-leave", page, perPage, search],
    queryFn: async () => {
      const res = await api.get("/jenis-cuti", {
        params: {
          page,
          per_page: perPage,
          search,
        },
      });

      return res.data;
    },
  });
};
export const useTypeLeave = (id: string) => {
  return useQuery({
    queryKey: ["type-leave", id],
    queryFn: async () => {
      const res = await api.get(`/jenis-cuti/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};
export const useCreateTypeLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/jenis-cuti/store", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["type-leave"],
      });
      toast.success("Type of leave created successfully");
    },
    onError: () => {
      toast.error("Failed to create type of leave");
    },
  });
};
export const useDeleteTypeLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/jenis-cuti/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["type-leave"],
      });
      toast.success("Type of leave deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete type of leave");
    },
  });
};
export const useUpdateTypeLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await api.patch(`/jenis-cuti/update/${id}`, data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["type-leave"],
      });
      toast.success("Type of leave updated successfully");
    },
    onError: () => {
      toast.error("Failed to update type of leave");
    },
  });
};

export const useTypeLeaveNoPage = () => {
  return useQuery({
    queryKey: ["type-leaves"],
    queryFn: async () => {
      const res = await api.get("/jenis-cuti");
      return res.data;
    },
  });
};
