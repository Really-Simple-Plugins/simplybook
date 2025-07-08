import { useQuery } from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";

const useThemeColors = () => {
    const client = new HttpClient();
    const route = 'theme_colors';

    const { data: response, isLoading, error } = useQuery({
        queryKey: [route],
        queryFn: () => client.setRoute(route).get(),
        refetchOnMount: 'always',
    });

    return {
        colors: response?.data?.colors || {
            primary: '#FF3259',
            secondary: '#000000',
            active: '#055B78',
            background: '#f7f7f7',
            foreground: '#494949',
            text: '#ffffff',
        },
        isExtendify: response?.data?.is_extendify || false,
        isLoading,
        error,
    };
};

export default useThemeColors;