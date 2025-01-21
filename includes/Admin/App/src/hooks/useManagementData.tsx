import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getPlugins from "../api/endpoints/Dashboard/getPlugins";
/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useManagementData = () => {
    const queryClient = useQueryClient();

    // Query for fetching settings from server
    const query = useQuery({
        queryKey: ["manage_data"],
        queryFn: () => getPlugins(),
        staleTime: 1000 * 60 * 60 * 24,
        // @ts-ignore
        initialData: [],
        retry: 0,
        select: (data) => [...data], // create a new array so dependencies are updated
    });
    const isPluginActive = (id: string) => {
        return query.data.some((plugin) => plugin.key === id && plugin.is_active);
    }

    return {
        isPluginActive,
        refetchData: query.refetch,
        plugins: query.data,
    };
};

export default useManagementData;
