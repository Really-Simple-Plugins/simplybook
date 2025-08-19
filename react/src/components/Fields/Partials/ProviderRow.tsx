import React, { useEffect, useState } from "react";
import ProviderForm from "./ProviderForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { __ } from '@wordpress/i18n';
import { useCrudContext } from "../../../context/CrudContext";
import Provider from "../../../types/Provider";
import useDomainData from "../../../hooks/useDomainData";

type ProviderRowProps = {
    provider: Provider,
    providers: Provider[],
    isLoading: boolean,
}

const ProviderRow: React.FC<ProviderRowProps> = ({
     provider,
     providers,
     isLoading,
}) => {
    const { crudState, dispatch, handleDeletingItem } = useCrudContext();
    const { domain } = useDomainData();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isProviderVisible, setIsProviderVisible] = useState(false);
    const [isOnlyVisibleProvider, setIsOnlyVisibleProvider] = useState(false);
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(providers.length <= 1);
    const [providerHasErrors, setProviderHasErrors] = useState(false);

    const hasPicture = provider.picture_preview && provider.picture_preview.length > 0;

    useEffect(() => {
        const isCurrentlyVisible = crudState.currentlyVisibleProviders?.includes(provider.id);
        setIsProviderVisible(isCurrentlyVisible ?? !!provider.is_visible);
    }, []);

    //TODO simplify
    useEffect(() => {
        const isOnlyProvider = crudState.providers?.every((providerToTest) => provider.id === providerToTest.id);
        const isOnlyVisibleProviderAfterUpdate = crudState.currentlyVisibleProviders.every((id) => provider.id === id);
        if (isOnlyVisibleProviderAfterUpdate != isOnlyVisibleProvider) {
            setIsOnlyVisibleProvider(isOnlyVisibleProviderAfterUpdate);
        }

        const isOnlyCurrentlySavedVisibleProvider = crudState.providers?.filter((providerToTest) => providerToTest.is_visible).every((providerToTest) => provider.id === providerToTest.id);
        const shouldDeleteBeDisabled = isOnlyCurrentlySavedVisibleProvider != undefined && isOnlyProvider != undefined ? (isOnlyCurrentlySavedVisibleProvider || isOnlyVisibleProviderAfterUpdate || isOnlyProvider) : false;
        if (shouldDeleteBeDisabled != isDeleteDisabled) {
            setIsDeleteDisabled(shouldDeleteBeDisabled);
        }

        const isCurrentlyVisible = crudState.currentlyVisibleProviders.includes(provider.id);
        if (isCurrentlyVisible != isProviderVisible) {
            setIsProviderVisible(isCurrentlyVisible);
        }
    }, [crudState]);

    useEffect(() => {
        const errorsForThisProvider = crudState.providerErrors ? crudState.providerErrors[provider.id] : null;
        if (errorsForThisProvider && !isExpanded) {
            setIsExpanded(true);
        }
        setProviderHasErrors(!!errorsForThisProvider);
    }, [crudState.providerErrors]);

    const toggleRow = () => {
        setIsExpanded(!isExpanded);
    };

    const handleVisibilityToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({
            dispatchType: 'unsavedChangesToProviders',
            change: { item: { id: provider.id, is_visible: event.target.checked } }
        });
        setIsProviderVisible(event.target.checked);
    };

    return (
        <div className={"border border-gray-200 rounded-lg mb-4 bg-gray-50"}>
            {/* Main row */}
            <div
                className={"flex items-center justify-between p-4 rounded-t-lg gap-2"}
                onClick={() => {
                    if (!providerHasErrors) {
                        toggleRow();
                    }
                }}
            >
                {/* Left side: Provider info */}
                <div className="flex space-x-3 flex-1 max-w-3/5">
                    {/* Provider picture preview */}
                    {hasPicture ?
                        <img className="w-20 h-20 min-w-[36px] max-w-[36px] max-h-[36px] bg-blue-100 text-xs flex items-center justify-center overflow-hidden rounded-full" src={domain + provider.picture_preview} alt="..."/>
                        :
                        <div className="w-20 h-20 min-w-[36px] max-w-[36px] max-h-[36px] bg-blue-100 text-xs flex items-center justify-center overflow-hidden rounded-full font-bold">
                            {provider.name?.charAt(0).toUpperCase()}
                        </div>
                    }

                    {/* Provider name */}
                    <div className="flex items-center flex-1 max-w-2/3">
                        <div className="text-sm font-medium text-gray-900 truncate">{provider.name}</div>
                    </div>
                </div>

                {/* Right side: Actions */}
                <div className="flex space-x-3">
                    {/* Trash Icon */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeletingItem(provider.id);
                        }}
                        disabled={ isLoading || isDeleteDisabled }
                        className="text-gray-500 hover:text-red-600 hover:bg-red-100 disabled:opacity-50 p-1 rounded cursor-pointer disabled:cursor-not-allowed flex items-center h-6"
                        title={isDeleteDisabled ? __('Cannot delete the only visible service provider', 'simplybook') : __('Delete Service Provider', 'simplybook')}
                    >
                        <FontAwesomeIcon icon={faTrash} className="w-4 h-4"/>
                    </button>

                    {/* Visibility Toggle */}
                    <div
                        className={"mt-[1px]"}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <label
                            className={clsx(
                                "relative inline-flex items-center mb-0",
                                isOnlyVisibleProvider ? "cursor-not-allowed" : "cursor-pointer",
                            )}
                            title={
                                isOnlyVisibleProvider
                                    ? __('Cannot hide the only visible service provider', 'simplybook')
                                    : isProviderVisible ? __('Visible', 'simplybook') : __('Hidden', 'simplybook')
                            }
                        >
                            <input
                                type="checkbox"
                                checked={isProviderVisible}
                                onChange={handleVisibilityToggle}
                                disabled={isOnlyVisibleProvider}
                                className="sr-only peer"
                            />
                            <div className={clsx(
                                "w-8 h-[18px] bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer",
                                "peer-checked:bg-blue-600 peer-checked:after:translate-x-[0.8rem] peer-checked:after:border-white",
                                "after:content-[''] after:mx-[0.2rem] flex items-center after:left-0.5 after:bg-white after:border-gray-200",
                                "after:border after:rounded-full after:aspect-square after:h-3 after:w-3 after:transition-all",
                                isOnlyVisibleProvider && "opacity-50 cursor-not-allowed"
                            )}></div>
                        </label>
                    </div>

                    {/* Dropdown Toggle */}
                    <button
                        type="button"
                        disabled={providerHasErrors}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleRow();
                        }}
                        className={clsx("px-1 rounded text-gray-500 active:ring-4 focus:ring-4 active:ring-blue-300 focus:ring-blue-300 hover:bg-gray-200 transition-transform duration-200 cursor-pointer flex items-center h-6",
                            providerHasErrors && "pointer-events-none opacity-50 cursor-not-allowed"
                        )}
                        title={isExpanded ? __('Collapse', 'simplybook') : __('Expand', 'simplybook')}
                    >
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={clsx("w-4 h-4 self-start mt-1 transition-transform duration-200",
                                isExpanded && "rotate-180"
                            )}
                        />
                    </button>
                </div>
            </div>

            {/* Expanded section */}
            {isExpanded && (
                <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-lg">
                    <ProviderForm
                        provider={provider}
                        providerId={provider.id}
                    />
                </div>
            )}
        </div>
    );
};

export default ProviderRow;