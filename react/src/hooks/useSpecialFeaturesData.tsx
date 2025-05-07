import { useQuery } from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";
import SpecialFeaturesData from "../types/SpecialFeaturesData";

/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */    
const useSpecialFeaturesData = () => {

    const route = 'get_plugins';
    const client = new HttpClient(route);

    const {isLoading, error, data: response, refetch} = useQuery<SpecialFeaturesData>({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
    });

    if (error !== null) {
        console.error('Error fetching special features data:', error.message);
    } 

    const isPluginActive = (id: string): boolean => {
        return response?.data.some((plugin:any) => plugin.key === id && plugin.is_active) ?? false;
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