import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getSettingsFields from "../api/endpoints/getSettingsFields";
import saveSettingsFields from "../api/endpoints/saveSettings";
/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useSettingsData = () => {
  const queryClient = useQueryClient();

  // Query for fetching settings from server
  const query = useQuery({
    queryKey: ["settings_fields"],
    queryFn: () => getSettingsFields({ withValues: true }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    initialData: window.simplybook && window.simplybook.settings_fields,
    retry: 0,
    select: (data) => [...data], // create a new array so dependencies are updated
  });

  const getValue = (id) => query.data.find((field) => field.id === id)?.value;
  const setValue = (id, value) => {
    const field = query.data.find((field) => field.id === id);
    if (field) {
      field.value = value;
    }
  };
  // Update Mutation for settings data with destructured values
  const { mutateAsync: saveSettings, isLoading: isSavingSettings } =
    useMutation({
      mutationFn: async (data) => {
        console.log("saving....");
        let settings = await saveSettingsFields(data);
        console.log("saved!, reloaded data ", settings)
        return settings;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["settings_fields"]);
        queryClient.setQueryData(["settings_fields"], data);
      },
    });

  return {
    settings: query.data,
    saveSettings,
    getValue,
    setValue,
    isSavingSettings,
    invalidateSettings: () =>
      queryClient.invalidateQueries(["settings_fields"]),
  };
};

export default useSettingsData;
