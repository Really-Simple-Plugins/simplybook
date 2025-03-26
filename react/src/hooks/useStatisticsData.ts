import { useQuery } from "@tanstack/react-query";
import useOnboardingData from "./useOnboardingData";
import { StatisticsData } from "../types/StatisticsData";
import request from "../api/requests/request";

const useStatisticsData = () => {
    const { onboardingCompleted } = useOnboardingData();

    const query = useQuery<StatisticsData>({
        queryKey: ["statistics"],
        queryFn: async () => {
            if (!onboardingCompleted) {
                return {} as StatisticsData;
            }

            let response = await request('statistics');
            if (response == null) {
                console.error('statistics error', response);
                return {} as StatisticsData;
            }

            return response;
        },
        staleTime: 1000 * 60 * 60,
        retry: 0,
        enabled: !!onboardingCompleted,
    });

    const isLoading = query.isLoading;

    return {
        statistics: query.data?.data,
        mostPopularProvider: query.data?.data?.most_popular_provider,
        mostPopularProviderName: query.data?.data?.most_popular_provider.name,
        mostPopularProviderBookings: query.data?.data?.most_popular_provider_bookings,
        mostPopularService: query.data?.data?.most_popular_service,
        mostPopularServiceName: query.data?.data?.most_popular_service.name,
        mostPopularServiceBookings: query.data?.data?.most_popular_service_bookings,
        bookingsToday: query.data?.data?.bookings_today,
        bookingsThisWeek: query.data?.data?.bookings_this_week,
        bookingsLastThirtyDays: query.data?.data?.bookings,
        isLoading: isLoading,
    }
};

export default useStatisticsData;