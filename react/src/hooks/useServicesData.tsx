import { useEffect } from 'react';
import useCrudData from './useCrudData';
import { useNotifications } from '../context/NotificationContext';

const useServicesData = () => {
    const crudData = useCrudData('services', 'service');
    const { triggerNotificationById } = useNotifications();
    
    // Trigger notification when services array is empty
    useEffect(() => {
        if (crudData.dataFetched && crudData.data?.length === 0) {
            triggerNotificationById('add_mandatory_service');
        }
    }, [crudData.dataFetched, crudData.data?.length, triggerNotificationById]);
    
    // Log errors
    useEffect(() => {
        if (crudData.error) {
            console.error('Error fetching services: ', crudData.error.message);
        }
    }, [crudData.error]);
    
    return {
        services: crudData.data ?? [],
        servicesFetched: crudData.dataFetched ?? false,
        isLoading: crudData.isLoading ?? false,
        error: crudData.error ?? null,
        createService: crudData.create,
        updateService: crudData.update,
        deleteService: crudData.delete,
        isCreating: crudData.isCreating ?? false,
        isUpdating: crudData.isUpdating ?? false,
        isDeleting: crudData.isDeleting ?? false,
        createError: crudData.createError ?? null,
        updateError: crudData.updateError ?? null,
        deleteError: crudData.deleteError ?? null,
    };
};

export default useServicesData;