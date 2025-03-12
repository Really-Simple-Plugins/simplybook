import { useQuery, useQueryClient } from "@tanstack/react-query";
import getDashboardData from "../api/endpoints/Dashboard/getDashboardData";
import { DashboardData } from "../types/DashboardData";

/**
 * Custom hook for managing dashboard data using Tanstack Query.
 * This hook provides functions to fetch the data.
 *
 * @returns {Object} - An object containing dashboard data
 */
const useDashboardData = () => {

    const queryClient = useQueryClient();

    // Query for fetching settings from server
    const query = useQuery<DashboardData>({
        queryKey: ["dashboard_data"],
        queryFn: async () => {
            const response = await getDashboardData();
            console.log("getDashboardData response", response);
            return response;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes

        retry: 0,
    });
    const defaultData: DashboardData = {
        bookings_count_month: 0,
        bookings_count_day: 0,
        most_popular_provider: { name: '', percentage: 0 },
        most_popular_service: { name: '', percentage: 0 }
    };
    return {
        dashboardData: query.data || defaultData,
        refetchData: query.refetch,
    };
};

export default useDashboardData;