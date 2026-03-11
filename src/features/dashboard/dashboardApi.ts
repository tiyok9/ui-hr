import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/axios";
import toast from "react-hot-toast";

export const useSummaryDashboard = () => {
  return useQuery({
    queryKey: ["summary-dashboard"],
    queryFn: async () => {
      const res = await api.get("/dash/rekap");

      return res.data;
    },
  });
};
export const useChartDashboard = () => {
  return useQuery({
    queryKey: ["chart-dashboard"],
    queryFn: async () => {
      const res = await api.get("/dash/graph");

      return res.data;
    },
  });
};

export const useSummaryDashboardClient = () => {
  return useQuery({
    queryKey: ["summary-dashboard-client"],
    queryFn: async () => {
      const res = await api.get("/dash/graph-client");

      return res.data;
    },
  });
};
