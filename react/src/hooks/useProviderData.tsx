import { useEffect } from 'react';
import useCrudData from './useCrudData';
import { useNotifications } from '../context/NotificationContext';

const useProviderData = () => {
    const crudData = useCrudData('providers', 'provider');
    const { triggerNotificationById } = useNotifications();
    
    // Trigger notification when providers array is empty
    useEffect(() => {
        if (crudData.dataFetched && crudData.data?.length === 0) {
            triggerNotificationById('add_mandatory_provider');
        }
    }, [crudData.dataFetched, crudData.data?.length]);
    
    // Log errors
    useEffect(() => {
        if (crudData.error) {
            console.error('Error fetching providers: ', crudData.error.message);
        }
    }, [crudData.error]);
    
    return {
        providers: crudData.data ?? [],
        providersFetched: crudData.dataFetched ?? false,
        isLoading: crudData.isLoading ?? false,
        error: crudData.error ?? null,
        getProviders: crudData.get,
        createProvider: crudData.create,
        updateProvider: crudData.update,
        deleteProvider: crudData.delete,
        isCreating: crudData.isCreating ?? false,
        isUpdating: crudData.isUpdating ?? false,
        isDeleting: crudData.isDeleting ?? false,
        createError: crudData.createError ?? null,
        updateError: crudData.updateError ?? null,
        deleteError: crudData.deleteError ?? null,
    };
};

export default useProviderData;