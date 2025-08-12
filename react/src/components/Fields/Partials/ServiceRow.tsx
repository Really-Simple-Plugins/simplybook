import React, { useEffect, useState } from "react";
import ServiceForm from "./ServiceForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { __ } from "@wordpress/i18n";
import { useCrudContext } from "../../../context/CrudContext";
import Service from "../../../types/Service";
import useDomainData from "../../../hooks/useDomainData";

type ServiceRowProps = {
    service: Service,
    services: Service[],
    isLoading: boolean,
}
const ServiceRow: React.FC<ServiceRowProps> = ({
    service,
    services,
    isLoading,
}) => {
    const { crudState, dispatch, handleDeletingItem } = useCrudContext();
    const { domain } = useDomainData();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isServiceVisible, setIsServiceVisible] = useState(false);
    const [isOnlyVisibleService, setIsOnlyVisibleService] = useState(false);
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(services.length <= 1);
    const [serviceHasErrors, setServiceHasErrors] = useState(false);

    const hasPicture = service.picture_preview && service.picture_preview.length > 0;

    useEffect(() => {
        const isCurrentlyVisible = crudState.currentlyVisibleServices?.includes(service.id);
        setIsServiceVisible(isCurrentlyVisible ?? !!service.is_visible);
    }, []);

    //TODO simplify
    useEffect(() => {
        const isOnlyService = crudState.services?.every((serviceToTest) => service.id === serviceToTest.id);
        const isOnlyVisibleServiceAfterUpdate = crudState.currentlyVisibleServices?.every((id) => service.id === id);
        if (isOnlyVisibleServiceAfterUpdate != undefined && (isOnlyVisibleServiceAfterUpdate != isOnlyVisibleService)) {
            setIsOnlyVisibleService(isOnlyVisibleServiceAfterUpdate);
        }
        const shouldDeleteBeDisabled = isOnlyVisibleServiceAfterUpdate != undefined && isOnlyService != undefined ? (isOnlyVisibleServiceAfterUpdate || isOnlyService) : false;
        if (shouldDeleteBeDisabled != isDeleteDisabled) {
            setIsDeleteDisabled(shouldDeleteBeDisabled);
        }
        const isCurrentlyVisible = crudState.currentlyVisibleServices?.includes(service.id);
        if (isCurrentlyVisible != undefined && isCurrentlyVisible != isServiceVisible) {
            setIsServiceVisible(isCurrentlyVisible);
        }
    }, [crudState]);

    useEffect(() => {
        const errorsForThisService = crudState.serviceErrors ? crudState.serviceErrors[service.id] : null;
        if (errorsForThisService) {
            setIsExpanded(true);
        }
        setServiceHasErrors(!!errorsForThisService);
    }, [crudState.serviceErrors]);

    const toggleRow = () => {
        setIsExpanded(!isExpanded);
    }
    
    const handleVisibilityToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        dispatch({dispatchType: 'unsavedChangesToServices', change: {item: {id: service.id, is_visible: event.target.checked} }});
        setIsServiceVisible(event.target.checked);
    };


    return (
        <div className={"border border-gray-200 rounded-lg mb-6 bg-gray-50"}>
            {/* Main row */}
            <div
                className={"flex items-center justify-between p-4 rounded-t-lg  gap-2"}
                onClick={() => {
                    if(!serviceHasErrors) {
                        toggleRow();
                    }
                }}
            >
                {/* Left side: Service info */}
                <div className="flex space-x-3 flex-1 max-w-3/5">
                    {/* Service picture preview */}
                    {hasPicture ?
                        <img className="w-20 h-20 min-w-[36px] max-w-[36px] max-h-[36px] bg-blue-100 text-xs flex items-center justify-center overflow-hidden rounded-full" src={domain + service.picture_preview}  alt={__('...', 'simplybook')}/>
                        :
                        <div className="w-20 h-20 min-w-[36px] max-w-[36px] max-h-[36px] bg-blue-100 text-xs flex items-center justify-center overflow-hidden rounded-full font-bold">
                            {service.name?.charAt(0).toUpperCase()}
                        </div>
                    }

                    {/* Service name */}
                    <div className="flex items-center flex-1 max-w-2/3">
                        <div className="text-sm font-medium text-gray-900 truncate">{service.name}</div>
                    </div>
                </div>

                {/* Right side: Actions */}
                <div className="flex space-x-3">
                    {/* Trash Icon */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeletingItem(service.id);
                        }}
                        disabled={ isLoading || isDeleteDisabled }
                        className="text-gray-500 hover:text-red-600 hover:bg-red-100 disabled:opacity-50 p-1 cursor-pointer disabled:cursor-not-allowed flex items-center h-6"
                        title={isDeleteDisabled ? __('Cannot delete the only visible service', 'simplybook') : __('Delete Service', 'simplybook')}
                    >
                        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                    </button>

                    {/* Visibility Toggle */}
                    <div
                        className={"mt-[1px]"}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <label className={clsx(
                            "relative inline-flex items-center mb-0",
                            isOnlyVisibleService ? "cursor-not-allowed" : "cursor-pointer"
                        )} title={
                            isOnlyVisibleService
                                ? __('Cannot hide the last visible service', 'simplybook')
                                : isServiceVisible ? __('Visible', 'simplybook') : __('Hidden', 'simplybook')
                        }
                        >
                            <input
                                type="checkbox"
                                checked={isServiceVisible}
                                onChange={handleVisibilityToggle}
                                disabled={isOnlyVisibleService}
                                className="sr-only peer"
                            />
                            <div className={clsx(
                                "w-8 h-[18px] bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer",
                                "peer-checked:bg-blue-600 peer-checked:after:translate-x-[0.8rem] peer-checked:after:border-white",
                                "after:content-[''] after:mx-[0.2rem] flex items-center after:left-0.5 after:bg-white after:border-gray-200",
                                "after:border after:rounded-full after:aspect-square after:h-3 after:w-3 after:transition-all",
                                isOnlyVisibleService && "opacity-50 cursor-not-allowed"
                            )}></div>
                        </label>
                    </div>

                    {/* Dropdown Toggle */}
                    <button
                        type="button"
                        disabled={serviceHasErrors}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleRow();
                        }}
                        className={clsx("px-1 rounded text-gray-500 active:ring-4 focus:ring-4 active:ring-blue-300 focus:ring-blue-300 hover:bg-gray-200 transition-transform duration-200 cursor-pointer flex items-center h-6",
                            serviceHasErrors && "pointer-events-none opacity-50 cursor-not-allowed"
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
                    <ServiceForm
                        service={service}
                        serviceId={service.id}
                    />
                </div>
            )}
        </div>
    );
};

export default ServiceRow;