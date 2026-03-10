import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/axios";
import toast from "react-hot-toast";

export const useViewAttendance = (
  page: number,
  perPage: number,
  search: string,
  month: string,
) => {
  return useQuery({
    queryKey: ["view-attendance", page, perPage, search, month],
    queryFn: async () => {
      const res = await api.get("/absensi/user", {
        params: {
          page,
          per_page: perPage,
          search,
          month,
        },
      });

      return res.data;
    },
  });
};

export const useViewAttendanceReport = (month: string) => {
  return useQuery({
    queryKey: ["view-attendance-report", month],
    queryFn: async () => {
      const res = await api.get("/absensi/rekap", {
        params: {
          month,
        },
      });
      return res.data;
    },
  });
};
