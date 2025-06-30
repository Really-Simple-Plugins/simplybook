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
        mutationFn: async (params: { id: string | number; data: any }) => {
            console.log('SIMPLYBOOK DEBUG: updateProvider called with:', params);
            try {
                const result = await client.put(`${route}/${params.id}`, params.data);
                console.log('SIMPLYBOOK DEBUG: updateProvider response:', result);
                return result;
            } catch (error) {
                console.error('SIMPLYBOOK DEBUG: updateProvider error:', error);
                throw error;
            }
        },
        onMutate: async (params) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: [route] });
            
            // Snapshot the previous value
            const previousProviders = queryClient.getQueryData([route]);
            
            // Optimistically update to the new value
            queryClient.setQueryData([route], (old: any) => {
                if (!old?.data) return old;
                return {
                    ...old,
                    data: old.data.map((provider: any) => 
                        provider.id === params.id 
                            ? { ...provider, ...params.data }
                            : provider
                    )
                };
            });
            
            // Return a context object with the snapshotted value
            return { previousProviders };
        },
        onError: (err, params, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            if (context?.previousProviders) {
                queryClient.setQueryData([route], context.previousProviders);
            }
        },
        onSettled: () => {
            // Always refetch after error or success to ensure server state
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