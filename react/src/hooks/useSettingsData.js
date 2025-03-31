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
     * Transform data to ensure boolean values for checkboxes.
     */
    const transformData = (data) => {
        return data.map((field) => {
            if (field.type === "checkbox") {
                field.value = !!field.value;
            }
            return field;
        });
    };

    /**
     * Fetch settings fields using Tanstack Query.
     */
    const query = useQuery({
        queryKey: [getSettingsQueryKey],
        queryFn: () => client.setRoute(getSettingsRoute).setPayload({
            withValues: true,
        }).post(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        initialData: transformData(
            window.simplybook && window.simplybook.settings_fields,
        ),
        retry: 0,
        select: function (data) {
            let fields = (data?.data ?? data);
            return transformData(fields);
        }
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
     */
    const setValue = (id, value) => {
        queryClient.setQueryData([getSettingsQueryKey], (oldResponse) => {
            return oldResponse.map((field) =>
                field.id === id ? { ...field, value } : field,
            );
        });
    };

    /**
     * Save settings mutation
     */
    const { mutateAsync: saveSettings, isLoading: isSavingSettings } = useMutation({
        // Post new settings
        mutationFn: async (data) => {
            let settings = await client.setRoute(saveSettingsRoute).setPayload(data).post();
            return transformData(settings?.data);
        },
        // Mutate current settings to show updated values
        onSuccess: (data) => {
            queryClient.setQueryData([getSettingsQueryKey], (oldResponse) => {
                return data ? [...data] : [];
            });

            // Do NOT "await" here: it results in showing default settings
            queryClient.invalidateQueries({queryKey: [getSettingsQueryKey]});
        },
    });

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