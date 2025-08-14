import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCrudContext } from '../../context/CrudContext';
import ProviderRow from './Partials/ProviderRow';
import ProviderForm from './Partials/ProviderForm';
import useSubscriptionData from "../../hooks/useSubscriptionData";
import ButtonInput from "../Inputs/ButtonInput";

const ProvidersListField = () => {
    const { crudState, dispatch } = useCrudContext();
    const { providersRemaining, providersTotal, getSubscriptionData } = useSubscriptionData();
    const [providerCount, setProviderCount] = useState(providersTotal - providersRemaining);

    useEffect(() => {
        console.log(crudState);
    }, [crudState]);

    useEffect(() => {
        getSubscriptionData().then((test) => {
            console.log(test);
        });
        if (crudState.providers) {
            setProviderCount(crudState.providers.length);
        }
    }, [crudState.providers]);

    const handleCancelCreatingNew = () => {
        dispatch({ dispatchType: "createNewCanceled" });
        dispatch({ dispatchType: "clearAllErrorsForItem", change: { item: { id: "new" } } });
    };

    const defaultNewProvider = { id: "new", name: '', email: '', phone: '', qty: 1 };

    const handleAdd = () => {
        dispatch({ dispatchType: 'isCreatingNewChanged', change: { isCreatingNewProvider: true } });
        dispatch({ dispatchType: 'unsavedChangesToProviders', change: { item: defaultNewProvider } });
    };

    if (!crudState.providers || crudState.isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2">{__('Loading service providers...', 'simplybook')}</span>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* If there's no providers and we're not loading, render message, else render Provider List */}
            {!crudState.isLoading && crudState.providers && crudState.providers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    {__('No service providers found.', 'simplybook') + (providersRemaining > 0 ? __('Click "Add Service Provider" to create your first service provider.', 'simplybook') : '')}
                </div>
            ) : (
                <div className="space-y-6">
                    {crudState.providers?.filter(provider => provider != null).map((provider) => (
                        <ProviderRow
                            key={provider.id}
                            provider={provider}
                            providers={crudState.providers}
                        />
                    ))}
                </div>
            )}

            {/* Only show add new provider if user is allowed to add one */}
            {providersRemaining > 0 && (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                            <ButtonInput
                                type="button"
                                className="font-bold bg-secondary"
                                onClick={crudState.isCreatingNewProvider ? handleCancelCreatingNew : handleAdd}
                                disabled={crudState.isSaving}
                                btnVariant="square-small"
                            >
                                <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2 text-white font-bold"/>
                                {crudState.isCreatingNewProvider ? __('Cancel New Service Provider', 'simplybook') : __('Add Service Provider', 'simplybook')}
                            </ButtonInput>
                        </div>
                        <div className={"rounded-md px-2 py-1 text-tertiary font-bold bg-blue-100"}>
                            <span>{`Providers: ${providerCount} / ${providersTotal}`}</span>
                        </div>
                    </div>

                    {/* Add New Provider Form */}
                    {crudState.isCreatingNewProvider && (
                        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <h4 className="text-md font-medium mb-4">{__('Add New Service Provider', 'simplybook')}</h4>
                            <ProviderForm
                                providerId={"new"}
                                provider={defaultNewProvider}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProvidersListField;