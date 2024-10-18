import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

/**
 * Custom hook for managing settings data using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useSettingsData = () => {
  const queryClient = useQueryClient();

  // Store for managing local changes before saving
  const [localSettings, setLocalSettings] = useState({});

  // Placeholder settings array to simulate settings from server
  const placeholderSettings = {
    'general': {
    'authentication': {
      'apiKey': {
        'label': 'API Key',
        'type': 'text',
        'value': '1234567890',
      },
      'apiSecret': {
        'label': 'API Secret',
        'type': 'text',
        'value': '1234567890',
      },
    },
      'widgets': {
      'bookings_page': {
        'label': 'Bookings Page',
        'type': 'text',
        'value': 'https://simplybook.me',
      },
      'calendar_page': {
        'label': 'Calendar Page',
        'type': 'text',
        'value': 'https://simplybook.me',
      },
        'short_code': {
          'label': 'Short Code',
          'type': 'text',
          'value': '1234567890',
        },
      }
    },
    'providers': {
      'name': {
        'label': 'Name',
        'type': 'text',
        'value': 'John Doe',
      },
      'email': {
        'label': 'Email',
        'type': 'email',
        'value': '',
      },
      'phone': {
        'label': 'Phone',
        'type': 'tel',
        'value': '',
      },
    }
  };

  // Placeholder function for fetching settings from server
  const fetchSettings = async () => {
    // Simulate an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(placeholderSettings);
      }, 1000);
    });
  };

  // Placeholder function for updating settings on server
  const updateSettings = async (updatedSettings) => {
    // Simulate an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(updatedSettings);
      }, 1000);
    });
  };

  // Query for fetching settings from server
  const { data: settings, isLoading, isError } = useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings,
    onSuccess: (data) => {
      // Set initial settings to state
      setLocalSettings(data);
    },
    staleTime: 60000, // Keep data fresh for 1 minute
  });

  // Mutation for updating settings on server
  const updateSettingsMutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      // Invalidate and refetch settings after successful update
      queryClient.invalidateQueries(['settings']);
    },
  });

  /**
   * Function to handle updating local settings state.
   *
   * @param {string} key - The key of the setting to update.
   * @param {any} value - The new value for the setting.
   */
  const updateSetting = (key, value) => {
    setLocalSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  /**
   * Function to save the updated settings to the server.
   */
  const saveSettings = () => {
    updateSettingsMutation.mutate(localSettings);
  };

  useEffect(() => {
    // Sync localSettings with fetched settings
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  return {
    settings: localSettings,
    updateSetting,
    saveSettings,
    isLoading,
    isError,
    isSaving: updateSettingsMutation.isLoading,
  };
};

export default useSettingsData;
