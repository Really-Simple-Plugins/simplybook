import { useQuery } from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";
import SpecialFeaturesData from "../types/SpecialFeaturesData";
import useOnboardingData from "./useOnboardingData";

/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useSpecialFeaturesData = () => {

    const { onboardingCompleted } = useOnboardingData();

    const route = 'get_plugins';
    const client = new HttpClient(route);

    const {isLoading, error, data: response, refetch} = useQuery<SpecialFeaturesData>({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 60 * 24,
        retry: 0,
        enabled: !!onboardingCompleted,
    });

    if (error !== null) {
        console.error('Error fetching special features data:', error.message);
    }

    const isPluginActive = (id: string) => {

        if (isLoading || !response) {
            return false;
        }

        const foundPlugin = response?.data.find((plugin:any) => plugin.key === id);

        if (!foundPlugin) {
            console.error(`Plugin with ID ${id} does not exist.`);
            return false;
        }

        return foundPlugin.is_active;
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