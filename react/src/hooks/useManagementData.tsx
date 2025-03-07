import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getPlugins from "../api/endpoints/Dashboard/getPlugins";
/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useManagementData = () => {
    const query = useQuery({
        queryKey: ["manage_data"],
        queryFn: () => getPlugins(),
        staleTime: 1000 * 60 * 60 * 24,
        // @ts-ignore
        initialData: [],
        retry: 0,
        select: (data) => [...data],
    });
    const isPluginActive = (id: string) => {
        return query.data.some((plugin) => plugin.id === id && plugin.is_turned_on);
    }

    return {
        isPluginActive,
        refetchData: query.refetch,
        plugins: query.data,
    };
};

export default useManagementData;
