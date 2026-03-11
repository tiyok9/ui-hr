import { useMutation, useQuery } from "@tanstack/react-query";
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
export const useManageAttandance = (
  page: number,
  perPage: number,
  search: string,
) => {
  return useQuery({
    queryKey: ["attandance", page, perPage, search],
    queryFn: async () => {
      const res = await api.get("/absensi", {
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
export const useExportCSVAttandance = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await api.get("/absensi/export/csv", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "attandace.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
  });
};
