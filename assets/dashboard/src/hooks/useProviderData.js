import {  useQuery, useQueryClient } from "@tanstack/react-query";
import getProviders from "../api/endpoints/getProviders";
/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useProvidersData = () => {
    const queryClient = useQueryClient();

    // Query for fetching settings from server
    const query = useQuery({
        queryKey: ["providers"],
        queryFn: () => getProviders(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 0,
        select: (data) => [...data],
    });

    return {
        providers: query.data,
    };
};

export default useProvidersData;
