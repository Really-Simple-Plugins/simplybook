import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";

const useProviderData = () => {
    const route = 'providers';
    const client = new HttpClient(route);
    const queryClient = useQueryClient();

    const { isLoading, error, data: response } = useQuery({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    });

    const createProviderMutation = useMutation({
        mutationFn: (providerData) => client.post(providerData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [route] });
        },
    });

    const updateProviderMutation = useMutation({
        mutationFn: (params: { id: string | number; data: any }) => client.put(`${route}/${params.id}`, params.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [route] });
        },
    });

    const deleteProviderMutation = useMutation({
        mutationFn: (id) => client.delete(`${route}/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [route] });
        },
    });

    if (error) {
        console.error('Error fetching provider data: ', error.message);
    }

    const providers = response?.data || [];
    const providersFetched = !isLoading && !error;

    return {
        providers,
        providersFetched,
        isLoading,
        error,
        createProvider: createProviderMutation.mutateAsync,
        updateProvider: updateProviderMutation.mutateAsync,
        deleteProvider: deleteProviderMutation.mutateAsync,
        isCreating: createProviderMutation.isPending,
        isUpdating: updateProviderMutation.isPending,
        isDeleting: deleteProviderMutation.isPending,
        createError: createProviderMutation.error,
        updateError: updateProviderMutation.error,
        deleteError: deleteProviderMutation.error,
    };
};

export default useProviderData;