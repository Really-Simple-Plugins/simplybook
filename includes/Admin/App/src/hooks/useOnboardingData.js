import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Custom hook for managing onboarding data (e.g. prefills and existing data) using Tanstack Query.
 * This hook provides functions to fetch and update settings.
 *
 * @returns {Object} - An object containing settings data, update function, and status flags.
 */
const useOnboardingData = () => {
  const queryClient = useQueryClient();

  // Query for fetching settings from server
  const query = useQuery({
    queryKey: ["onboarding_fields"],
    queryFn: () => {
      // Simulate fetching settings data
      return new Promise((resolve, reject) => {
        if (window.simplybook && window.simplybook.onboarding_fields) {
          resolve(window.simplybook.onboarding_fields);
        } else {
          reject(new Error("Settings not found"));
        }
      });
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    initialData: window.simplybook && window.simplybook.onboarding_fields,
  });

  // Update Mutation for settings data with destructured values
  const { mutateAsync: saveOnboarding, isLoading: isSavingOnboarding } =
    useMutation({
      mutationFn: async (data) => {
        // Simulate async operation (e.g., API call to save settings)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Optionally return data or a result
        return data; // Or any other meaningful result
      },
      onSuccess: () => {
        // Invalidate cache by specific query key for updated data
        queryClient.invalidateQueries(["onboarding_fields"]);
      },
    });

  return {
    settings: query.data,
    saveOnboarding,
    isSavingOnboarding,
    invalidateOnboarding: () =>
      queryClient.invalidateQueries(["onboarding_fields"]),
  };
};

export default useOnboardingData;
