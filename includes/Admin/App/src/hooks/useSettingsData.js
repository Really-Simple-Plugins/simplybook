import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
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

  const transformData = (data) => {
    //find all items with type===checkbox, and ensure that the value is a boolean
    return data.map((field) => {
      if (field.type === "checkbox") {
        field.value = !!field.value;
      }
      return field;
    });
  }

  const query = useQuery({
    queryKey: ["settings_fields"],
    queryFn: () => getSettingsFields({ withValues: true }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    initialData: transformData(window.simplybook && window.simplybook.settings_fields),
    retry: 0,
    select: (data) => data ? [...data] : [],
  });

  const getValue = (id) => {
    return query.data.find((field) => field.id === id)?.value;
  }
  const setValue = (id, value) => {
    queryClient.setQueryData(["settings_fields"], (oldData) => {
      return oldData.map((field) =>
          field.id === id ? { ...field, value } : field
      );
    });
  };

  // Update Mutation for settings data with destructured values
  const { mutateAsync: saveSettings, isLoading: isSavingSettings } =
    useMutation(
        {
      mutationFn: async (data) => {
        console.log("saving data", data);
        let settings = await saveSettingsFields(data);
        return transformData(settings);
      },
      onSuccess: async (data) => {
        queryClient.setQueryData(["settings_fields"], (oldData) => {
          return data ? [...data] : [];
        });
        queryClient.invalidateQueries(["settings_fields"]);
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
