import { useQuery } from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";

/**
 * Get fallback colors from server-side config via wp_localize_script.
 * 
 * Colors are managed in /config/colors.php and made available 
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
        queryFn: () => client.setRoute(route).get(),
        refetchOnMount: 'always',
    });

    return {
        colors: response?.data?.colors || getFallbackColors(),
        isExtendify: response?.data?.is_extendify || false,
        isLoading,
        error,
    };
};

export default useThemeColors;