import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import HttpClient from "../api/requests/HttpClient";

interface CrudDataParams {
    id: string | number;
    data: any;
}

interface CrudDataReturn {
    data: any[];
    dataFetched: boolean;
    isLoading: boolean;
    error: any;
    create: (data: any) => Promise<any>;
    update: (params: CrudDataParams) => Promise<any>;
    delete: (id: string | number) => Promise<any>;
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
    createError: any;
    updateError: any;
    deleteError: any;
}

const useCrudData = (route: string, resourceName: string): CrudDataReturn => {
    const client = new HttpClient(route);
    const queryClient = useQueryClient();

    const { isLoading, error, data: response } = useQuery({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    });

    const createMutation = useMutation({
        mutationFn: (data: any) => client.post(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [route] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: async (params: CrudDataParams) => {
            console.log(`SIMPLYBOOK DEBUG: update${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)} called with:`, params);
            try {
                const result = await client.put(`${route}/${params.id}`, params.data);
                console.log(`SIMPLYBOOK DEBUG: update${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)} response:`, result);
                return result;
            } catch (error) {
                console.error(`SIMPLYBOOK DEBUG: update${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)} error:`, error);
                throw error;
            }
        },
        onMutate: async (params) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: [route] });
            
            // Snapshot the previous value
            const previousData = queryClient.getQueryData([route]);
            
            // Optimistically update to the new value
            queryClient.setQueryData([route], (old: any) => {
                if (!old?.data) return old;
                return {
                    ...old,
                    data: old.data.map((item: any) => 
                        item.id === params.id 
                            ? { ...item, ...params.data }
                            : item
                    )
                };
            });
            
            // Return a context object with the snapshotted value
            return { previousData };
        },
        onError: (err, params, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            if (context?.previousData) {
                queryClient.setQueryData([route], context.previousData);
            }
        },
        onSettled: () => {
            // Always refetch after error or success to ensure server state
            queryClient.invalidateQueries({ queryKey: [route] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string | number) => client.delete(`${route}/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [route] });
        },
    });

    if (error) {
        console.error(`Error fetching ${resourceName} data: `, error.message);
    }

    const data = response?.data || [];
    const dataFetched = !isLoading && !error;

    return {
        data,
        dataFetched,
        isLoading,
        error,
        create: createMutation.mutateAsync,
        update: updateMutation.mutateAsync,
        delete: deleteMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
        createError: createMutation.error,
        updateError: updateMutation.error,
        deleteError: deleteMutation.error,
    };
};

export default useCrudData;