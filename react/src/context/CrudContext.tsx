import React, {
    createContext,
    useContext,
    useReducer,
    Dispatch,
    useEffect,
} from 'react';
import * as _ from "lodash";
import useProviderData from "../hooks/useProviderData";
import useServicesData from "../hooks/useServicesData";
import Provider from "../types/Provider";
import Service from "../types/Service";
import { __ } from "@wordpress/i18n";
import ToastNotice from "../components/Errors/ToastNotice";
import { DataError } from "../api/helpers/DataError";

interface CrudContext {
    crudState: CrudState,
    dispatch: Dispatch<CrudReducerAction>,
    handleDeletingItem: (id: Provider['id'] | Service['id']) => void,
    saveItems: () => void,
}

/**
 * Context for CRUD operations state management.
 * Used to share CRUD-related data and functions across components.
 */
const CrudContext = createContext<CrudContext | null>(null);

/**
 * Hook to access the CRUD context.
 * @returns The CRUD context value
 */
export const useCrudContext = () => {
    const context = useContext(CrudContext);
    if (!context) {
        throw Error("useCrudContext can only be used by child components inside the CrudContextProvider");
    }
    return context;
};

/**
 * The main Crud Context Component
 * Gives its children access to all items specified in the CrudContext interface
 * @returns The Context Provider component
 */
export const CrudContextProvider = ({children}: {children: React.ReactNode}) => {
    const [crudState, dispatch] = useReducer(
        crudStateReducer,
        initialCrudState
    );
    //TODO
    const { getServices, createService, updateService, deleteService, isLoading: isServicesLoading, servicesFetched } = useServicesData();
    const { getProviders, createProvider, updateProvider, deleteProvider, isLoading: isProvidersLoading, providersFetched } = useProviderData();
    const toastNotice = new ToastNotice();

    useEffect(() => {
        dispatch({dispatchType: 'loadingChanged', change: {isLoading: isProvidersLoading || isServicesLoading} });
    }, [isProvidersLoading, isServicesLoading]);

    // Providers and Services get fetched each time the respective page is loaded, except when there are pending changes
    useEffect(() => {
        switch (crudState.itemType){
            case 'service': {
                if (crudState.servicesHasUnsavedChanges) {
                    break;
                }
                getServices().then((response) => {
                    const services = response.data.data;
                    const visibleServices = services.flatMap((service: Service) => service.is_visible ? service.id : [])
                    dispatch({dispatchType: 'servicesUpdated', change: { services: services, currentlyVisibleServices: visibleServices }});
                    return services;
                }).catch((error) => {
                    console.error(error);
                    dispatch({ dispatchType: "generalError", change: { error: error.message } })
                });
                break;
            }
            case 'provider': {
                if (crudState.providersHasUnsavedChanges) {
                    break;
                }
                getProviders().then((response) => {
                    const providers = response.data.data;
                    const currentlyVisible = providers.flatMap((provider: Provider) => provider.is_visible ? provider.id : [])
                    dispatch({dispatchType: 'providersUpdated', change: { providers: providers, currentlyVisibleProviders: currentlyVisible }});
                    return providers;
                }).catch((error) => {
                    console.error(error);
                    dispatch({ dispatchType: "generalError", change: { error: error.message } })
                });
                break;
            }
            default: {
                break;
            }
        }
    }, [crudState.itemType]);

    const handleDeletingItem = (itemId: Provider['id'] | Service['id']) => {
        let deleteFunction;
        let confirmationMessage;
        let dispatchType;
        switch (crudState.itemType) {
            case 'provider': {
                deleteFunction = deleteProvider;
                confirmationMessage = __('Are you sure you want to delete this Service Provider?', 'simplybook');
                dispatchType = 'providerDeleted';
                break;
            }
            case 'service': {
                deleteFunction = deleteService;
                confirmationMessage = __('Are you sure you want to delete this Service?', 'simplybook');
                dispatchType = 'serviceDeleted'
                break;
            }
            default: {
                throw new Error('ItemType not set');
            }
        }
        if (window.confirm(confirmationMessage)) {
            deleteFunction(itemId).then(() => {
                dispatch({ dispatchType: dispatchType, change: { item: { id: itemId } } });
            }).catch((error) => {
                console.error('Error on deletion:', error);
            });
        }
    };

    const handleSave = () => {
        if (!crudState.unsavedProviders || !crudState.unsavedServices) {
            dispatch({dispatchType: 'generalError', change: {error: __('There are no unsaved changes' ,'simplybook')}})
            throw new Error("Nothing to save");
        }

        let unsavedItems;
        let createFunction;
        let updateFunction;
        let successMessages;
        let errorMessages;
        let successDispatchType;
        switch (crudState.itemType) {
            case 'provider': {
                unsavedItems = crudState.unsavedProviders;
                createFunction = createProvider;
                updateFunction = updateProvider;
                successMessages = {
                    create: __('Service Provider created successfully', 'simplybook'),
                    update: __('Service Provider updated successfully', 'simplybook'),
                };
                errorMessages = {
                    create: __('Error creating Service Provider', 'simplybook'),
                    update: __('Error updating Service Provider', 'simplybook'),
                };
                successDispatchType = {
                    create: 'providerCreatedSuccessfully',
                    update: 'providerUpdatedSuccessfully',
                };
                break;
            }
            case 'service': {
                unsavedItems = crudState.unsavedServices;
                createFunction = createService;
                updateFunction = updateService;
                successMessages = {
                    create: __('Service created successfully', 'simplybook'),
                    update:  __('Service updated successfully', 'simplybook'),
                };
                errorMessages = {
                    create: __('Error creating Service', 'simplybook'),
                    update: __('Error updating Service', 'simplybook'),
                };
                successDispatchType = {
                    create: 'serviceCreatedSuccessfully',
                    update: 'serviceUpdatedSuccessfully',
                };
                break;
            }
            default: {
                throw new Error('ItemType not set');
            }
        }
        const errorCallback = (error: DataError, type: string = '', id: string | number) => {
            console.error('Error on save:', error);
            if (error.fields) {
                dispatch({dispatchType: "errorsOnFields", change: {item: {id: id, ...error.fields}}});
            } else {
                dispatch({ dispatchType: "generalError", change: { error: error.message } })
            }
            toastNotice
                .setMessage(type ? errorMessages[type] : __('An error occurred trying to save your changes', 'simplybook'))
                .setType("error").render();
            dispatch({dispatchType: 'savingChanged', change: {isSaving: false}});
            throw error;
        };

        for (let unsavedItem of unsavedItems) {
            if (!unsavedItem.name){
                errorCallback(new DataError('No name provided', {name: __(`${crudState.itemType === 'provider' ? 'Provider' : 'Service'} name is required`, 'simplybook')}), '',  unsavedItem.id)
            }

            if (!unsavedItem.id) {
                throw new Error('No ID provided');
            }

            const data = formatItem({...unsavedItem});
            console.log("data", data);

            if (unsavedItem.id === "new") {
                createFunction(data).then((response) => {
                    dispatch({dispatchType: successDispatchType.create, change: {item: response.data}});
                    toastNotice.setMessage(successMessages.create).setType("success").render();
                    dispatch({dispatchType: 'savingChanged', change: {isSaving: false}});
                }).catch((error) => {
                    errorCallback(error, 'create', "new");
                });
            } else {
                updateFunction({ id: unsavedItem.id, data: data }).then((response) => {
                    dispatch({dispatchType: successDispatchType.update, change: {item: response.data}});
                    toastNotice.setMessage(successMessages.update).setType("success").render();
                    dispatch({dispatchType: 'savingChanged', change: {isSaving: false}});
                }).catch((error) => {
                    errorCallback(error, 'update', unsavedItem.id);
                });
            }
        }
    };


    return (
        <CrudContext.Provider
            value={{crudState, dispatch,  handleDeletingItem: handleDeletingItem, saveItems: handleSave,}}
        >
            {children}
        </CrudContext.Provider>
    );
}

//TODO implement something like this so action.change is allowed to be partial and the actual state has accurate mandatory fields
type PartialCrudState = Partial<CrudState> ;

interface CrudReducerAction {
    dispatchType: string,
    change: CrudState,
}

const crudStateReducer = (state: CrudState, action: CrudReducerAction): CrudState => {
    switch (action.dispatchType) {
        case 'crudItemTypeChanged': {
            return {...state, itemType: action.change.itemType};
        }
        case 'unsavedChangesToProviders': {
            if (!action.change.item){
                throw new Error('Item to update not set');
            }

            const originalProviderState = state.providers ? state.providers.find((provider) => provider.id === action.change.item?.id) : null;
            const providerInUnsaved = state.unsavedProviders ? state.unsavedProviders.find((provider) => provider.id === action.change.item?.id) : null;
            const updatedProviderToSave = {...(providerInUnsaved ? providerInUnsaved : originalProviderState), ...action.change.item };
            const isProviderBackToOriginalState = _.isEqual(originalProviderState, updatedProviderToSave);
            const currentlyVisibleProviders = state.currentlyVisibleProviders ?? [];
            const isChangeToVisibility = Object.keys(action.change.item).includes('is_visible');

            if (isProviderBackToOriginalState){
                const updatedProvidersList = state.unsavedProviders?.filter((provider)=> updatedProviderToSave.id != provider.id) ?? [];
                return {
                    ...state,
                    unsavedProviders: updatedProvidersList,
                    providersHasUnsavedChanges: updatedProvidersList.length ? updatedProvidersList.length > 0 : false,
                    ...(isChangeToVisibility && { currentlyVisibleServices: setCurrentlyVisibleItems(Number(updatedProviderToSave.id), currentlyVisibleProviders, !!updatedProviderToSave.is_visible) }),
                };
            }

            const indexOfUnsavedProvider = state.unsavedProviders ? state.unsavedProviders.findIndex((provider)=>provider.id === updatedProviderToSave.id) : -1;
            const updatedUnsavedProvidersList = state.unsavedProviders ? [...state.unsavedProviders] : [];

            if (indexOfUnsavedProvider != -1){
                updatedUnsavedProvidersList[indexOfUnsavedProvider] = updatedProviderToSave;
            } else {
                updatedUnsavedProvidersList.push(updatedProviderToSave)
            }

            return {
                ...state,
                unsavedProviders: updatedUnsavedProvidersList,
                providersHasUnsavedChanges: true,
                ...(isChangeToVisibility && { currentlyVisibleServices: setCurrentlyVisibleItems(Number(updatedProviderToSave.id), currentlyVisibleProviders, !!updatedProviderToSave.is_visible) }),
            };
        }
        case 'unsavedChangesToServices': {
            if (!action.change.item) {
                throw new Error('Item to update not set');
            }

            const originalServiceState = state.services ? state.services.find((service) => service.id === action.change.item?.id) : null;
            const serviceInUnsaved = state.unsavedServices ? state.unsavedServices.find((service) => service.id === action.change.item?.id) : null;
            const updatedServiceToSave = {...(serviceInUnsaved ? serviceInUnsaved : originalServiceState), ...action.change.item };
            const isServiceStateBackToOriginalState = _.isEqual(originalServiceState, updatedServiceToSave);
            const currentlyVisibleServices = state.currentlyVisibleServices ?? [];
            const isChangeToVisibility = Object.keys(action.change.item).includes('is_visible');

            if (isServiceStateBackToOriginalState) {
                const updatedUnsavedServiceList = state.unsavedServices?.filter((service) => updatedServiceToSave.id != service.id) ?? [];
                return {
                    ...state,
                    unsavedServices: updatedUnsavedServiceList,
                    servicesHasUnsavedChanges: updatedUnsavedServiceList.length ? updatedUnsavedServiceList.length > 0 : false,
                    ...(isChangeToVisibility && { currentlyVisibleServices: setCurrentlyVisibleItems(Number(updatedServiceToSave.id), currentlyVisibleServices, !!updatedServiceToSave.is_visible) }),
                };
            }

            const indexOfUnsavedService = state.unsavedServices ? state.unsavedServices.findIndex((service) => service.id === updatedServiceToSave.id) : -1;
            const updatedUnsavedServiceList = state.unsavedServices ? [...state.unsavedServices] : [];

            if (indexOfUnsavedService != -1){
                updatedUnsavedServiceList[indexOfUnsavedService] = updatedServiceToSave;
            } else {
                updatedUnsavedServiceList.push(updatedServiceToSave)
            }

            return {
                ...state,
                unsavedServices: updatedUnsavedServiceList,
                servicesHasUnsavedChanges: true,
                ...(isChangeToVisibility && { currentlyVisibleServices: setCurrentlyVisibleItems(Number(updatedServiceToSave.id), currentlyVisibleServices, !!updatedServiceToSave.is_visible) }),
            };
        }
        case 'providersUpdated': {
            if (!action.change.providers) {
                throw Error('Providers not set');
            }
            return {
                ...state,
                providers: action.change.providers,
                ...(action.change.currentlyVisibleProviders && {currentlyVisibleProviders: action.change.currentlyVisibleProviders}),
            };
        }
        case 'servicesUpdated': {
            if (!action.change.services) {
                throw Error('Services not set');
            }
            return {
                ...state,
                services: action.change.services,
                ...(action.change.currentlyVisibleServices && {currentlyVisibleServices: action.change.currentlyVisibleServices}),
            };
        }
        case 'isCreatingNewChanged': {
            if (!(action.change.isCreatingNewProvider || action.change.isCreatingNewService)) {
                throw new Error("No creating new state provided");
            }
            return {
                ...state,
                ...(state.itemType === 'provider' && {
                    isCreatingNewProvider: action.change.isCreatingNewProvider,

                }),
                ...(state.itemType === 'service' && {
                    isCreatingNewService: action.change.isCreatingNewService,
                }),
            };
        }
        case 'cancelAllUnsavedChanges': {
            let updatedListOfVisibleItems;
            switch (state.itemType) {
                case 'provider': {
                    updatedListOfVisibleItems = state.providers?.filter((provider)=> provider.is_visible).map((provider)=>provider.id);
                break;
                }
                case 'service': {
                    updatedListOfVisibleItems = state.services?.filter((service)=> service.is_visible).map((service)=>service.id);
                break;
                }
                default: {
                    throw new Error('ItemType not set');
                }
            }

            return {
                ...state,
                ...(state.itemType === 'provider' && {
                    providersHasUnsavedChanges: false,
                    currentlyVisibleProviders: updatedListOfVisibleItems,
                    unsavedProviders: [],
                    isCreatingNewProvider: false,
                    providerErrors: {},
                }),
                ...(state.itemType === 'service' && {
                    servicesHasUnsavedChanges: false,
                    currentlyVisibleServices: updatedListOfVisibleItems,
                    unsavedServices: [],
                    isCreatingNewService: false,
                    serviceErrors: {},
                }),
            };
        }
        case 'providerUpdatedSuccessfully': {
            if (!action.change.item){
                throw  new Error("No provider provided")
            }
            //TODO refetch
            const updatedListOfUnsavedProviders = state.unsavedProviders ? state.unsavedProviders?.filter((provider) => provider.id !== action.change.item?.id) : [];
            const updatedListOfAllProviders = state.providers ? state.providers.map((provider) => {
                if (provider.id === action.change.item?.id){
                    return action.change.item;
                }
                return provider;
            }) : [];
            const updatedListOfVisibleProviders = updatedListOfAllProviders.flatMap((provider) => provider.is_visible ? provider.id : [])
            return {
                ...state,
                providers: updatedListOfAllProviders,
                unsavedProviders: updatedListOfUnsavedProviders,
                providersHasUnsavedChanges: updatedListOfUnsavedProviders.length !== 0,
                currentlyVisibleProviders: updatedListOfVisibleProviders,
            };
        }
        case 'providerCreatedSuccessfully': {
            if (!action.change.item){
                throw  new Error("No provider provided")
            }
            //TODO: refetch
            const updatedListOfUnsavedProviders = state.unsavedProviders ? state.unsavedProviders?.filter((provider) => provider.id !== "new") : [];
            const currentProviders = state.providers ?? [];
            const updatedListOfAllProviders = [...currentProviders, action.change.item]
            const updatedListOfVisibleProviders = updatedListOfAllProviders.flatMap((provider) => provider.is_visible ? provider.id : [])
            return {
                ...state,
                isCreatingNewProvider: false,
                providers: updatedListOfAllProviders,
                unsavedProviders: updatedListOfUnsavedProviders,
                providersHasUnsavedChanges: updatedListOfUnsavedProviders.length  !== 0,
                currentlyVisibleProviders: updatedListOfVisibleProviders,
            };
        }case 'serviceUpdatedSuccessfully': {
            if (!action.change.item){
                throw new Error("No service provided")
            }
            //TODO refetch
            const updatedListOfUnsavedServices = state.unsavedServices ? state.unsavedServices?.filter((service) => service.id !== action.change.item?.id) : [];
            const updatedListOfAllServices = state.services ? state.services.map((service) => {
                if (service.id === action.change.item?.id) {
                    return action.change.item;
                }
                return service;
            }) : [];
            const updatedListOfVisibleServices = updatedListOfAllServices.flatMap((service) => service.is_visible ? service.id : [])
            return {
                ...state,
                services: updatedListOfAllServices,
                unsavedServices: updatedListOfUnsavedServices,
                servicesHasUnsavedChanges: updatedListOfUnsavedServices.length !== 0,
                currentlyVisibleServices: updatedListOfVisibleServices,
            };
        }
        case 'serviceCreatedSuccessfully': {
            if (!action.change.item) {
                throw new Error("No new service provided")
            }
            //TODO: refetch
            const updatedListOfUnsavedServices = state.unsavedServices ? state.unsavedServices?.filter((service) => service.id !== "new") : [];
            const currentServices = state.services ?? [];
            const updatedListOfAllServices = [...currentServices, action.change.item]
            const updatedListOfVisibleServices = updatedListOfAllServices.flatMap((service) => service.is_visible ? service.id : [])
            return {
                ...state,
                isCreatingNewService: false,
                services: updatedListOfAllServices,
                unsavedServices: updatedListOfUnsavedServices,
                servicesHasUnsavedChanges: updatedListOfUnsavedServices.length !== 0,
                currentlyVisibleServices: updatedListOfVisibleServices,
            };
        }
        case 'createNewCanceled': {
            let updatedListOfUnsavedItemsAfterCancel;
            switch (state.itemType) {
                case 'provider': {
                    updatedListOfUnsavedItemsAfterCancel = state.unsavedProviders?.filter((provider)=> provider.id != "new") ?? [];
                    break;
                }
                case 'service': {
                    updatedListOfUnsavedItemsAfterCancel = state.unsavedServices?.filter((service)=> service.id != "new") ?? [];
                    break;
                }
                default: {
                    throw new Error('ItemType not set');
                }
            }
            return {
                ...state,
                ...(state.itemType === 'provider' && {
                    providersHasUnsavedChanges: updatedListOfUnsavedItemsAfterCancel.length ? updatedListOfUnsavedItemsAfterCancel.length > 0 : false,
                    isCreatingNewProvider: false,
                    unsavedProviders: updatedListOfUnsavedItemsAfterCancel,
                }),
                ...(state.itemType === 'service' && {
                    servicesHasUnsavedChanges: updatedListOfUnsavedItemsAfterCancel.length ? updatedListOfUnsavedItemsAfterCancel.length > 0 : false,
                    isCreatingNewService: false,
                    unsavedProviders: updatedListOfUnsavedItemsAfterCancel,
                }),
            };
        }
        case 'providerDeleted': {
            if (action.change.item) {
                throw new Error('Item to delete not set');
            }
            const updatedListOfProviders = state.providers ? state.providers.filter((provider)=> provider.id !== action.change.item?.id) : [];
            const unsavedProvidersAfterDelete = state.unsavedProviders?.filter((provider)=> provider.id != action.change.item?.id) ?? [];
            const isItemCurrentlyVisible = action.change.item ? state.currentlyVisibleProviders?.includes(action.change.item['id']) : false;
            const currentlyVisibleProviders = state.currentlyVisibleProviders ?? [];
            return {
                ...state,
                providers: updatedListOfProviders,
                unsavedProviders: unsavedProvidersAfterDelete,
                servicesHasUnsavedChanges: unsavedProvidersAfterDelete.length ? unsavedProvidersAfterDelete.length > 0 : false,
                ...(isItemCurrentlyVisible && {currentlyVisibleProviders: currentlyVisibleProviders.filter((id)=> id != action.change.item?.id)})
            }
        }
        case 'serviceDeleted': {
            if (!action.change.item) {
                throw new Error('Item to delete not set');
            }
            const updatedListOfServices = state.services ? state.services.filter((service)=> service.id !== action.change.item?.id) : [];
            const unsavedServicesAfterDelete = state.unsavedServices?.filter((service)=> service.id != action.change.item?.id) ?? [];
            const isItemCurrentlyVisible = action.change.item ? state.currentlyVisibleServices?.includes(action.change.item['id']) : false;
            const currentlyVisibleServices = state.currentlyVisibleServices ?? [];
            return {
                ...state,
                services: updatedListOfServices,
                unsavedServices: unsavedServicesAfterDelete,
                servicesHasUnsavedChanges: unsavedServicesAfterDelete.length ? unsavedServicesAfterDelete.length > 0 : false,
                ...(isItemCurrentlyVisible && {currentlyVisibleServices: currentlyVisibleServices.filter((id)=> id != action.change.item?.id)})
            }
        }
        case 'errorsOnFields': {
            if (!action.change.item) {
                throw new Error('No errors provided ');
            }
            const replacedErrorMessages = replaceErrorMessages(action.change.item);

            let currentErrorsForItemType;
            switch (state.itemType) {
                case 'provider': {
                    currentErrorsForItemType = state.providerErrors;
                    break;
                }
                case 'service': {
                    currentErrorsForItemType = state.serviceErrors;
                    break;
                }
                default: {
                    throw new Error('ItemType not set');
                }
            }

            const currentErrorsForItem = action.change.item?.id && currentErrorsForItemType ? currentErrorsForItemType[action.change.item.id] : null;
            const updatedErrorsForItem = {...currentErrorsForItem, ...replacedErrorMessages};
            const updatedErrorsForItemType = {...currentErrorsForItemType, ...(action.change.item.id && {[action.change.item.id]: { ...updatedErrorsForItem }})};

            return {
                ...state,
                ...(state.itemType === 'provider' && { providerErrors: { ...updatedErrorsForItemType } }),
                ...(state.itemType === 'service' && { serviceErrors: { ...updatedErrorsForItemType } })
            };

        }
        case 'generalError': {
            if (!action.change.error) {
                throw new Error('No error provided');
            }
            return {
                ...state,
                error: action.change.error
            };
        }
        case 'clearErrorsForField': {
            //TODO: refactor so ts-ignores can be removed
            if (!action.change.item) {
                throw new Error('No item provided');
            }
            const field = Object.keys(action.change.item).find((key) => key !== 'id');

            if (!field){
                throw new Error("No field provided");
            }
            const currentErrorsForItemType = state.itemType === 'provider' ? state.providerErrors: state.serviceErrors;
            const currentErrorsForThisItem = action.change.item?.id && currentErrorsForItemType ? currentErrorsForItemType[action.change.item.id] : null;

            if (currentErrorsForThisItem && field) {
                //@ts-ignore
                delete currentErrorsForThisItem[field];
            }
            const updatedErrorsForItemType = {...currentErrorsForItemType, ...(action.change.item.id && {[action.change.item.id]: currentErrorsForThisItem})};

            //If, after removing the error on the field, there are no more fields with errors, delete the whole item from the error list
            //Because the error always has 'id' as a key, length === 1 would mean no other keys have errors
            if (currentErrorsForThisItem && Object.keys(currentErrorsForThisItem).length === 1) {
                //@ts-ignore
                delete updatedErrorsForItemType[action.change.item.id];
            }

            return {
                ...state,
                ...(state.itemType === 'provider' && { providerErrors: { ...updatedErrorsForItemType } }),
                ...(state.itemType === 'service' && { serviceErrors: { ...updatedErrorsForItemType } }),
            };
        }
        case 'clearAllErrorsForItem': {
            if (!action.change.item) {
                throw new Error('No item provided');
            }
            const currentErrorsForItem = state.itemType === 'provider' ? state.providerErrors ?? {} : state.serviceErrors ?? {};
            delete currentErrorsForItem[action.change.item.id];
            return {
                ...state,
                ...(state.itemType === 'provider' && { providerErrors: {...currentErrorsForItem} }),
                ...(state.itemType === 'service' && { serviceErrors: {...currentErrorsForItem} })
            };
        }
        case 'loadingChanged': {
            return {
                ...state,
                isLoading: action.change.isLoading,
            };
        }
        case 'savingChanged': {
            console.log("saving changed", action.change.isSaving);
            return {
                ...state,
                isSaving: action.change.isSaving,
            };
        }
        case 'reset': {
            return initialCrudState;
        }
        default: {
            throw new Error('Unknown action: ' + action.dispatchType);
        }
    }
}

const setCurrentlyVisibleItems = (id: number, currentlyVisibleItems: (string | number)[], isVisible: boolean) => {
    let updatedListOfVisibleItems;
    const isItemCurrentlyVisible = currentlyVisibleItems.includes(id);
    switch (isVisible) {
        case true: {
            if (!isItemCurrentlyVisible) {
                currentlyVisibleItems?.push(id);
            }
            updatedListOfVisibleItems = currentlyVisibleItems;
            break;
        }
        case false: {
            if (isItemCurrentlyVisible) {
                currentlyVisibleItems = currentlyVisibleItems?.filter((itemId) => itemId !== id);
            }
            updatedListOfVisibleItems = currentlyVisibleItems;
            break;
        }
    }
    return updatedListOfVisibleItems;
};

const formatItem = (item: {[key: string | number]: string | number | boolean}) => {
    return {
        name: item.name,
        is_visible: item.is_visible ?? true,
        ...(item.id && item.id !== 'new' && { id: item.id }),
        ...(item.qty && { qty: Math.max(Number(item.qty) || 1, 1) }),
        ...(item.email && { email: item.email || '' }),
        ...(item.phone  && { phone: item.phone || '' }),
        ...(item.duration && {duration: item.duration}),
    }
}

//TODO: move to backend
const replaceErrorMessages = (error: Provider | Service) => {
    let replacedErrorMessages: {[key: string]: string} = {};
    for (const [key, value] of Object.entries(error)) {
        switch (key) {
            case "email": {
                if (value[0].includes("only once per day")) {
                    replacedErrorMessages[key] = __("Email address can only be changed once per day.", 'simplybook');
                } else if (value[0].includes("valid")) {
                    replacedErrorMessages[key] = __("The email domain is not valid.", 'simplybook');
                } else {
                    replacedErrorMessages[key] = Array.isArray(value) ? value[0] : value;
                }
                break;
            }
            case "phone": {
                if (value[0].includes("Invalid")) {
                    replacedErrorMessages[key] = __("Phone format invalid. Please enter a valid phone number with country code (e.g., +31 123 456 789)", 'simplybook');
                } else {
                    replacedErrorMessages[key] = Array.isArray(value) ? value[0] : value;
                }
                break;
            }
            case "duration": {
                if (value[0].includes("multiple")) {
                    replacedErrorMessages[key] = __('Duration invalid. Please enter a valid number that is a multiple of your selected timeframe', 'simplybook');
                } else {
                    replacedErrorMessages[key] = Array.isArray(value) ? value[0] : value;
                }
                break;
            }
            default: {
                replacedErrorMessages[key] = Array.isArray(value) ? value[0] : value;
            }
        }
    }
    return replacedErrorMessages;
}

interface CrudState {
    itemType?: "service" | "provider" | null,
    item?: Provider | Service | null,
    providers?: Provider[],
    services?: Service[],
    unsavedProviders?: Provider[],
    unsavedServices?: Service[],
    providerErrors?: {[key: string | number]: Provider},
    serviceErrors?: {[key: string | number]: Service},
    currentlyVisibleProviders?: (number | string)[],
    currentlyVisibleServices?: (number | string)[],
    servicesHasUnsavedChanges?: boolean,
    isLoading?: boolean,
    isSaving?: boolean,
    providersHasUnsavedChanges?: boolean,
    isCreatingNewProvider?: boolean,
    isCreatingNewService?: boolean,
    error?: string,
}

const initialCrudState: CrudState = {
    itemType: null,
    item: null,
    unsavedProviders: [],
    unsavedServices: [],
    providerErrors: {},
    serviceErrors: {},
    currentlyVisibleProviders: [],
    currentlyVisibleServices: [],
    isLoading: false,
    isSaving: false,
    servicesHasUnsavedChanges: false,
    providersHasUnsavedChanges: false,
    isCreatingNewProvider: false,
    isCreatingNewService: false,
    error: '',
}