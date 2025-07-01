import useCrudData from './useCrudData';

const useProviderData = () => {
    const crudData = useCrudData('providers', 'provider');
    
    return {
        providers: crudData.data,
        providersFetched: crudData.dataFetched,
        isLoading: crudData.isLoading,
        error: crudData.error,
        createProvider: crudData.create,
        updateProvider: crudData.update,
        deleteProvider: crudData.delete,
        isCreating: crudData.isCreating,
        isUpdating: crudData.isUpdating,
        isDeleting: crudData.isDeleting,
        createError: crudData.createError,
        updateError: crudData.updateError,
        deleteError: crudData.deleteError,
    };
};

export default useProviderData;