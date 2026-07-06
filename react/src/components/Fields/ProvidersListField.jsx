import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCrudContext } from '../../context/CrudContext';
import ProviderRow from './Partials/ProviderRow';
import ProviderForm from './Partials/ProviderForm';
import useSubscriptionData from "../../hooks/useSubscriptionData";
import ButtonInput from "../Inputs/ButtonInput";
import { useBlocker } from "@tanstack/react-router";
import { useNotifications } from "../../context/NotificationContext";

const MAXED_OUT_PROVIDERS_NOTICE_ID = 'maxed_out_providers';

const ProvidersListField = () => {
    const { crudState, dispatch } = useCrudContext();
    const { providersRemaining, providersLimit, hasProviderLimit } = useSubscriptionData();
    const { triggerNotificationById, removeNotificationById, isActiveNotification } = useNotifications();

    const providersTotal = crudState.providers?.filter(provider => provider != null).length ?? 0;
    const pendingNewProviderCount = crudState.unsavedProviders?.some(provider => provider?.id === "new") ? 1 : 0;
    const isAtSavedProviderLimit = hasProviderLimit && providersTotal >= providersLimit;
    const isAtProviderLimit = hasProviderLimit && (providersTotal + pendingNewProviderCount) >= providersLimit;
    const canStartNewProvider = !isAtProviderLimit;

    useEffect(() => {
        if (!isAtSavedProviderLimit) {
            removeNotificationById(MAXED_OUT_PROVIDERS_NOTICE_ID);
            return;
        }

        if (isActiveNotification(MAXED_OUT_PROVIDERS_NOTICE_ID)) {
            return;
        }

        triggerNotificationById(MAXED_OUT_PROVIDERS_NOTICE_ID);
    }, [isAtSavedProviderLimit, isActiveNotification, removeNotificationById, triggerNotificationById]);

    useBlocker({
        shouldBlockFn: ({ next }) => {
            const hasAnyUnsavedChanges = crudState.unsavedServices.length !== 0 || crudState.unsavedProviders.length !== 0;
            if (next.pathname.includes("settings") || !hasAnyUnsavedChanges) {
                return false; // Don't block within the settings page, all unsaved changes are stored in context
            }

            const shouldLeave = window.confirm(
                __('You have unsaved changes. Are you sure you want to leave?\n\nYour changes will be lost.', 'simplybook'),
            );

            return !shouldLeave;
        },
        enableBeforeUnload: crudState.unsavedServices.length !== 0 || crudState.unsavedProviders.length !== 0,
    });

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
                <span className="ms-2">{__('Loading service providers', 'simplybook')}...</span>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* If there's no providers and we're not loading, render message, else render Provider List */}
            {!crudState.isLoading && crudState.providers && crudState.providers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    {__('No service providers found.', 'simplybook') + (providersRemaining > 0 || !hasProviderLimit ? ' ' + __('Click "Add Service Provider" to create your first service provider.', 'simplybook') : '')}
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

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    {(canStartNewProvider || crudState.isCreatingNewProvider) && (
                        <>
                            {/* Only show add new provider if user is allowed to add one */}
                            <ButtonInput
                                type="button"
                                className="font-bold border-secondary bg-secondary text-white"
                                onClick={crudState.isCreatingNewProvider ? handleCancelCreatingNew : handleAdd}
                                disabled={crudState.isSaving}
                                btnVariant="square"
                            >
                                <FontAwesomeIcon icon={faPlus} className="w-4 h-4 me-2 text-white font-bold"/>
                                {crudState.isCreatingNewProvider ? __('Cancel New Service Provider', 'simplybook') : __('Add Service Provider', 'simplybook')}
                            </ButtonInput>
                        </>
                    )}
                </div>
                {hasProviderLimit && (
                    <div className={"rounded-md px-2 py-1 text-tertiary font-bold bg-blue-100"}>
                        <span>{`Service Providers: ${providersTotal} / ${providersLimit}`}</span>
                    </div>
                )}
            </div>

            {isAtSavedProviderLimit && (
                <div className="mb-6 rounded-md bg-blue-100 px-4 py-3 text-sm font-medium text-tertiary">
                    {__('You have reached the maximum number of Service Providers for your plan.', 'simplybook')}
                </div>
            )}

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
        </div>
    );
};

export default ProvidersListField;
