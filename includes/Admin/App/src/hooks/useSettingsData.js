import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
    queryKey: ['settings_fields'],
    queryFn: () => {
      // Simulate fetching settings data
      return new Promise((resolve, reject) => {
        console.log('Fetching settings data');
        if (window.simplybook && window.simplybook.settings_fields) {
          resolve(window.simplybook.settings_fields);
        } else {
          reject(new Error('Settings not found'));
        }
      });
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    initialData: window.simplybook && window.simplybook.settings_fields,
  });

  // Update Mutation for settings data with destructured values
  const { mutateAsync: saveSettings, isLoading: isSavingSettings } = useMutation({
    mutationFn: async (data) => {
      console.log('Saving settings data', data);
      // Simulate async operation (e.g., API call to save settings)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Optionally return data or a result
      return data; // Or any other meaningful result
    },
    onSuccess: () => {
      // Invalidate cache by specific query key for updated data
      queryClient.invalidateQueries(['settings_fields']);
    },
  });

  return {
    settings: query.data,
    saveSettings,
    isSavingSettings,
    invalidateSettings: () => queryClient.invalidateQueries(['settings_fields']),
  };
};

export default useSettingsData;

