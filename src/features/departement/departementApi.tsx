import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/axios";
import toast from "react-hot-toast";

export const useDepartements = (
  page: number,
  perPage: number,
  search: string,
) => {
  return useQuery({
    queryKey: ["departements", page, perPage, search],
    queryFn: async () => {
      const res = await api.get("/departemen", {
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
export const useDepartement = (id: string) => {
  return useQuery({
    queryKey: ["departement", id],
    queryFn: async () => {
      const res = await api.get(`/departemen/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};
export const useCreateDepartement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/departemen/store", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departements"],
      });
      toast.success("Departement created successfully");
    },
    onError: () => {
      toast.error("Failed to create departement");
    },
  });
};
export const useDeleteDepartement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/departemen/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departements"],
      });
      toast.success("Departement deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete departement");
    },
  });
};
export const useUpdateDepartement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await api.patch(`/departemen/update/${id}`, data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departements"],
      });
      toast.success("Departement updated successfully");
    },
    onError: () => {
      toast.error("Failed to update departement");
    },
  });
};
