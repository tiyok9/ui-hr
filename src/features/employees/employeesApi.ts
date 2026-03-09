import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/axios";
import toast from "react-hot-toast";

export const useEmployees = (page: number, perPage: number, search: string) => {
  return useQuery({
    queryKey: ["employees", page, perPage, search],
    queryFn: async () => {
      const res = await api.get("/karyawan", {
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

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const res = await api.get(`/karyawan/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/karyawan/store", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      toast.success("Employee created successfully");
    },
    onError: () => {
      toast.error("Failed to create employee");
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/karyawan/delete/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      toast.success("Employee deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete employee");
    },
  });
};
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await api.patch(`/karyawan/update/${id}`, data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      toast.success("Employee updated successfully");
    },
    onError: () => {
      toast.error("Failed to update employee");
    },
  });
};

export const useUpdateStatusEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await api.patch(`/karyawan/update/status/${id}`);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      toast.success("Employee status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update employee status");
    },
  });
};

export const usePosition = () => {
  return useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      const res = await api.get("/jabatan");
      return res.data;
    },
  });
};
