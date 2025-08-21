import { useQuery } from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";

/**
 * Get fallback colors from server-side config via wp_localize_script.
 * 
 * Colors are managed in /config/environment.php and made available 
 * through DashboardController::localizedReactSettings().
 */
const getFallbackColors = () => {
    return simplybook.fallback_colors;
};

const useThemeColors = () => {
    const client = new HttpClient();
    const route = 'theme_colors';

    const { data: response, isLoading, error } = useQuery({
        queryKey: [route],
        queryFn: () => {
            return client.setRoute(route).get();
        },
        refetchOnMount: 'always',
    });

    return {
        colors: isLoading ? null : (response?.data?.colors || getFallbackColors()),
        isLoading,
        error,
    };
};

export default useThemeColors;