import { getDashboardAnalytics } from "@/features/dashboard/api/get-dashboard-analytics";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboardAnalytics = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardAnalytics,
  });
};
