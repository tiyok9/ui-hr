import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/axios";
import toast from "react-hot-toast";

export const useManageLeaves = (
  page: number,
  perPage: number,
  search: string,
) => {
  return useQuery({
    queryKey: ["manage-leave", page, perPage, search],
    queryFn: async () => {
      const res = await api.get("/cuti", {
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
export const useManageLeave = (id: string) => {
  return useQuery({
    queryKey: ["manage-leave", id],
    queryFn: async () => {
      const res = await api.get(`/cuti/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};
export const useCreateManageLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/cuti/store", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["manage-leaves"],
      });
      toast.success("Manage leave created successfully");
    },
    onError: () => {
      toast.error("Failed to create manage leave");
    },
  });
};
export const useDeleteManageLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/cuti/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["manage-leaves"],
      });
      toast.success("Manage leave deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete manage leave");
    },
  });
};
export const useUpdateManageLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await api.patch(`/cuti/update/${id}`, data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["manage-leaves"],
      });
      toast.success("Manage leave updated successfully");
    },
    onError: () => {
      toast.error("Failed to update manage leave");
    },
  });
};
