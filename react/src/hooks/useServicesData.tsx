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
        mutationFn: (params: { id: string | number; data: any }) => client.put(`${route}/${params.id}`, params.data),
        onSuccess: () => {
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