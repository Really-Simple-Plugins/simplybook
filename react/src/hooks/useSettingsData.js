import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";

/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useSettingsData = () => {
    const queryClient = useQueryClient();

    const getSettingsQueryKey = 'setting_fields';
    const getSettingsRoute = 'settings/get';
    const saveSettingsRoute = 'settings/save';
    const client = new HttpClient();

    /**
     * Fetch settings fields using Tanstack Query.
     */
    const query = useQuery({
        queryKey: [getSettingsQueryKey],
        queryFn: () => client.setRoute(getSettingsRoute).setPayload({
            withValues: true,
        }).post(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        initialData: {
            data: window.simplybook?.settings_fields
        },
        retry: 0,
        select: function (data) {
            return (data?.data ?? data);
        }
    });

    /**
     * Save settings mutation
     */
    const { mutateAsync: saveSettings, isLoading: isSavingSettings } = useMutation({
        // Post new settings
        mutationFn: async (data) => {
            return await client.setRoute(saveSettingsRoute).setPayload(data).post();
        },
        // Mutate current settings to show updated values
        onSuccess: (response) => {
            
            // Catch error in a .catch block when calling saveSettings for
            // specific error handling
            if (response?.status !== 'success') {
                throw response;
            }

            queryClient.setQueryData([getSettingsQueryKey], (oldResponse) => {
                return response?.data ? [...response?.data] : [];
            });

            // Do NOT "await" here: it results in showing default settings
            queryClient.invalidateQueries({queryKey: [getSettingsQueryKey]});
        },
    });

    /**
     * Get value for a specific setting field
     * @param id
     * @returns {*}
     */
    const getValue = (id) => {
        return query?.data.find((field) => field.id === id)?.value;
    };

    /**
     * Set value for a specific setting field
     * @param id
     * @param value
     * @returns {*} The updated settings data
     */
    const setValue = (id, value) => {
        let newSettings = query?.data?.map((field) =>
            field.id === id ? { ...field, value } : field,
        );

        if (newSettings) {
            saveSettings(newSettings);
        }
    };

    return {
        settings: query?.data,
        saveSettings,
        getValue,
        setValue,
        isSavingSettings: query?.isLoading,
        invalidateSettings: () => queryClient.invalidateQueries({queryKey: [getSettingsQueryKey]}),
    };
};

export default useSettingsData;