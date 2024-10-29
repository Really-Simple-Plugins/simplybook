import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Route } from '../routes/settings/$settingsId.lazy';

/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useSettingsData = () => {
  const queryClient = useQueryClient();
  const { settingsId } = Route.useParams();

  // Query for fetching settings from server
  const query = useQuery({
    queryKey: ['settings_fields'],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        if (window.simplybook && window.simplybook.settings_fields) {
          resolve(window.simplybook.settings_fields);
        }
        reject(new Error('Settings fields not found'));
      });
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Update Mutation for settings data with destructured values
  const { mutate: updateSettings, isLoading: settingsIsUpdating } = useMutation({
    mutationFn: (data) => {
      console.log('mutate data', data);
      // Simulate async operation
      return new Promise((resolve) => setTimeout(resolve, 10000));
    },
    onSuccess: () => {
      // Invalidate cache by specific query key for updated data
      queryClient.invalidateQueries(['settings_fields']);
    },
  });


  // Filtered settings based on the current settingsId
  const currentSettings = query.isFetched
      ? query.data.filter((setting) => setting.menu_id === settingsId)
      : {};

  console.log('currentSettings', currentSettings);
  // get default values id: value
  // if currentSettings is not empty

  const defaultValues = currentSettings.length > 0 ?currentSettings.reduce((acc, setting) => {
    acc[setting.id] = setting.value || setting.default;
    return acc;
  }, {}) : {};

  console.log('currentSettings', currentSettings);
  console.log('settingsIsUpdating', settingsIsUpdating);

  return {
    settings: query.data,
    currentSettings: currentSettings,
    settingsIsLoading: query.isLoading,
    settingsIsError: query.isError,
    settingsIsUpdating, // @todo fix as this does not work
    updateSettings,
    defaultValues
  };
};

export default useSettingsData;
