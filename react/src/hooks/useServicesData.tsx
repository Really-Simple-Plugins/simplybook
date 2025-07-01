import useCrudData from './useCrudData';

const useServicesData = () => {
    const crudData = useCrudData('services', 'service');
    
    return {
        services: crudData.data,
        servicesFetched: crudData.dataFetched,
        isLoading: crudData.isLoading,
        error: crudData.error,
        createService: crudData.create,
        updateService: crudData.update,
        deleteService: crudData.delete,
        isCreating: crudData.isCreating,
        isUpdating: crudData.isUpdating,
        isDeleting: crudData.isDeleting,
        createError: crudData.createError,
        updateError: crudData.updateError,
        deleteError: crudData.deleteError,
    };
};

export default useServicesData;