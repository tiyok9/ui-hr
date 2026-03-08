import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/axios";
import toast from "react-hot-toast";

export const usePositions = (page: number, perPage: number, search: string) => {
  return useQuery({
    queryKey: ["positions", page, perPage, search],
    queryFn: async () => {
      const res = await api.get("/jabatan", {
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
export const usePosition = (id: string) => {
  return useQuery({
    queryKey: ["position", id],
    queryFn: async () => {
      const res = await api.get(`/jabatan/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};
export const useCreatePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/jabatan/store", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["positions"],
      });
      toast.success("Position created successfully");
    },
    onError: () => {
      toast.error("Failed to create position");
    },
  });
};
export const useDepartements = () => {
  return useQuery({
    queryKey: ["departements"],
    queryFn: async () => {
      const res = await api.get("/departemen");
      return res.data;
    },
  });
};
export const useDeletePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/jabatan/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["positions"],
      });
      toast.success("Position deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete position");
    },
  });
};
export const useUpdatePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await api.patch(`/jabatan/update/${id}`, data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["positions"],
      });
      toast.success("Position updated successfully");
    },
    onError: () => {
      toast.error("Failed to update position");
    },
  });
};
