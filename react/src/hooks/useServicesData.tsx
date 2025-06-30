import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";

const useServicesData = () => {
    const route = 'services';
    const client = new HttpClient(route);
    const queryClient = useQueryClient();

    const { isLoading, error, data: response } = useQuery({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    });

    const createServiceMutation = useMutation({
        mutationFn: (serviceData) => client.post(serviceData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [route] });
        },
    });

    const updateServiceMutation = useMutation({
        mutationFn: async (params: { id: string | number; data: any }) => {
            console.log('SIMPLYBOOK DEBUG: updateService called with:', params);
            try {
                const result = await client.put(`${route}/${params.id}`, params.data);
                console.log('SIMPLYBOOK DEBUG: updateService response:', result);
                return result;
            } catch (error) {
                console.error('SIMPLYBOOK DEBUG: updateService error:', error);
                throw error;
            }
        },
        onMutate: async (params) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: [route] });
            
            // Snapshot the previous value
            const previousServices = queryClient.getQueryData([route]);
            
            // Optimistically update to the new value
            queryClient.setQueryData([route], (old: any) => {
                if (!old?.data) return old;
                return {
                    ...old,
                    data: old.data.map((service: any) => 
                        service.id === params.id 
                            ? { ...service, ...params.data }
                            : service
                    )
                };
            });
            
            // Return a context object with the snapshotted value
            return { previousServices };
        },
        onError: (err, params, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            if (context?.previousServices) {
                queryClient.setQueryData([route], context.previousServices);
            }
        },
        onSettled: () => {
            // Always refetch after error or success to ensure server state
            queryClient.invalidateQueries({ queryKey: [route] });
        },
    });

    const deleteServiceMutation = useMutation({
        mutationFn: (id) => client.delete(`${route}/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [route] });
        },
    });

    if (error) {
        console.error('Error fetching services data: ', error.message);
    }

    const services = response?.data || [];
    const servicesFetched = !isLoading && !error;

    return {
        services,
        servicesFetched,
        isLoading,
        error,
        createService: createServiceMutation.mutateAsync,
        updateService: updateServiceMutation.mutateAsync,
        deleteService: deleteServiceMutation.mutateAsync,
        isCreating: createServiceMutation.isPending,
        isUpdating: updateServiceMutation.isPending,
        isDeleting: deleteServiceMutation.isPending,
        createError: createServiceMutation.error,
        updateError: updateServiceMutation.error,
        deleteError: deleteServiceMutation.error,
    };
};

export default useServicesData;