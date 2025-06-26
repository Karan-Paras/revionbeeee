import { useQuery } from "@tanstack/react-query";
import { getDashboardAnalytics } from "@/features/dashboard/api/get-dashboard-analytics";

export const useGetDashboardAnalytics = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardAnalytics,
  });
};
