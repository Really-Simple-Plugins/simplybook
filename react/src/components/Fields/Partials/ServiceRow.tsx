import React from "react";
import ServiceForm from "./ServiceForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { __ } from "@wordpress/i18n";
import clsx from 'clsx';

type Service = {
    id: number,
    is_visible: boolean,
    name: string,
}

type ServiceRowProps = {
    formData: {
        name: string,
        duration: string,
        is_visible: boolean,
    },
    onChange: (type: string, target: string) => void,
    isLoading: boolean,
    error: {
        message: string,
    },
    service: Service,
    services: Service[],
    isExpanded: boolean,
    isEditing: boolean,
    isCreatingNew: boolean,
    onToggle: () => void,
    onDelete: () => void,
    visibilityOverrides: [],
    onVisibilityChange: (checked: boolean) => void,
}
const ServiceRow: React.FC<ServiceRowProps> = ({
    service,
    services,
    isExpanded,
    isEditing,
    isCreatingNew,
    onToggle,
    onDelete,
    formData,
    onChange,
    visibilityOverrides,
    onVisibilityChange,
    isLoading,
    error,
}) => {

    const handleVisibilityToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        if (onVisibilityChange) {
            onVisibilityChange(event.target.checked);
        }
    };

    // Check visibility in order: form data (if editing) -> visibility overrides -> original data
    const currentVisibility = isEditing && formData
        ? formData.is_visible
        : visibilityOverrides[service.id] !== undefined
            ? visibilityOverrides[service.id]
            : service.is_visible;

    // Count visible services (considering form state and visibility overrides)
    const visibleServicesCount = services.filter(service => {
        if (isEditing && service.id === service.id) {
            return currentVisibility;
        }
        // Check visibility overrides first, then original data
        return visibilityOverrides[service.id] !== undefined ? visibilityOverrides[service.id] : service.is_visible;
    }).length;

    // Disable toggle if this is the last visible service and we're trying to hide it
    const isToggleDisabled = currentVisibility && visibleServicesCount <= 1;

    // Disable delete if this is the last service
    const isDeleteDisabled = services.length <= 1;

    return (
        <div className={clsx(
            "border border-gray-300 rounded-lg shadow-sm mb-6",
            isCreatingNew ? "bg-gray-100 opacity-60" : "bg-gray-50"
        )}>
            {/* Main row */}
            <div
                className={clsx(
                    "flex items-center justify-between p-4 rounded-t-lg",
                    isCreatingNew ? "cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"
                )}
                onClick={onToggle}
            >
                {/* Left side: Service info */}
                <div className="flex items-center flex-1 max-w-2/3">
                    <div className="text-sm font-medium text-gray-900 truncate">{service.name}</div>
                </div>

                {/* Right side: Actions */}
                <div className="flex space-x-3">
                    {/* Trash Icon */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        disabled={isEditing || isLoading || isDeleteDisabled}
                        className="text-gray-500 hover:text-red-600 disabled:opacity-50 p-1 cursor-pointer disabled:cursor-not-allowed flex items-center h-6"
                        title={__('Delete Service', 'simplybook')}
                    >
                        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                    </button>

                    {/* Visibility Toggle */}
                    <div
                        className="h-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <label className={clsx(
                            "relative inline-flex items-center",
                            isToggleDisabled ? "cursor-not-allowed" : "cursor-pointer"
                        )} title={
                            isToggleDisabled
                                ? __('Cannot hide the last visible service', 'simplybook')
                                : currentVisibility ? __('Visible', 'simplybook') : __('Hidden', 'simplybook')
                        }
                        >
                            <input
                                type="checkbox"
                                checked={currentVisibility || false}
                                onChange={handleVisibilityToggle}
                                disabled={isToggleDisabled}
                                className="sr-only peer"
                            />
                            <div className={clsx(
                                "w-10 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer",
                                "peer-checked:bg-blue-600 peer-checked:after:translate-x-[1.125rem] peer-checked:after:border-white",
                                "after:content-[''] after:absolute after:top-1 after:left-0.5 after:bg-white after:border-gray-200",
                                "after:border after:rounded-full after:aspect-square after:h-4 after:w-4 after:transition-all",
                                isToggleDisabled && "opacity-50 cursor-not-allowed"
                            )}></div>
                        </label>
                    </div>

                    {/* Dropdown Toggle */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle();
                        }}
                        className="p-1 rounded hover:bg-gray-200 transition-transform duration-200 cursor-pointer flex items-center h-6"
                        title={isExpanded ? __('Collapse', 'simplybook') : __('Expand', 'simplybook')}
                    >
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={clsx("w-4 h-4 transition-transform duration-200",
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
                        formData={formData}
                        onChange={onChange}
                        isLoading={isLoading}
                        error={error}
                        serviceId={service.id}
                    />
                </div>
            )}
        </div>
    );
};

export default ServiceRow;