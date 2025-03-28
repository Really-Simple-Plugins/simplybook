import { useQuery } from "@tanstack/react-query";
import useOnboardingData from "./useOnboardingData";
import { StatisticsData } from "../types/StatisticsData";
import HttpClient from "../api/requests/HttpClient";

const useStatisticsData = () => {
    const { onboardingCompleted } = useOnboardingData();

    const route = 'statistics';
    const client = new HttpClient(route);

    const {isLoading, error, data: response} = useQuery<StatisticsData>({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
        enabled: !!onboardingCompleted,
    });

    if (error !== null) {
        console.error('Error fetching statistics data: ', error.message);
    }

    return {
        statistics: response?.data,
        mostPopularProvider: response?.data?.most_popular_provider,
        mostPopularProviderName: response?.data?.most_popular_provider.name,
        mostPopularProviderBookings: response?.data?.most_popular_provider_bookings,
        mostPopularService: response?.data?.most_popular_service,
        mostPopularServiceName: response?.data?.most_popular_service.name,
        mostPopularServiceBookings: response?.data?.most_popular_service_bookings,
        bookingsToday: response?.data?.bookings_today,
        bookingsThisWeek: response?.data?.bookings_this_week,
        bookingsLastThirtyDays: response?.data?.bookings,
        isLoading: isLoading,
        hasError: (error !== null),
    }
};

export default useStatisticsData;