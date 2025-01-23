import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getServices from "../api/endpoints/getServices";
/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useServicesData = () => {
    const queryClient = useQueryClient();

    // Query for fetching settings from server
    const query = useQuery({
        queryKey: ["services"],
        queryFn: () => getServices(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 0,
        select: (data) => [...data],
    });

    // Update Mutation for settings data with destructured values
    const { mutateAsync: saveSettings, isLoading: isSavingSettings } =
        useMutation({
            mutationFn: async (data) => {
                return await saveSettingsFields(data);
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(["services"]);
                queryClient.setQueryData(["services"], data);
            },
        });

    return {
        services: query.data,
        invalidateSettings: () =>
            queryClient.invalidateQueries(["services"]),
    };
};

export default useServicesData;
