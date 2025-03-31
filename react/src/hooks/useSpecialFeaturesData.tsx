import { useQuery } from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";
import SpecialFeaturesData from "../types/SpecialFeaturesData";

/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useSpecialFeaturesData = (): SpecialFeaturesData => {

    const route = 'get_plugins';
    const client = new HttpClient(route);

    const {isLoading, error, data: response, refetch} = useQuery({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 60 * 24,
        retry: 0,
        select: (data) => [...data],
    });

    if (error !== null) {
        console.error('Error fetching special features data:', error.message);
    }

    const isPluginActive = (id: string): boolean => {
        return response?.some((plugin) => plugin.id === id && plugin.is_turned_on) ?? false;
    }

    return {
        isPluginActive,
        refetchData: refetch,
        plugins: response ?? [],
        hasError: (error !== null),
        isLoading: isLoading,
    };
};

export default useSpecialFeaturesData;