import React, { useState, useEffect, useCallback, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import useServicesData from '../../hooks/useServicesData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { useCrudContext } from '../../context/CrudContext';
import LoginLink from '../Common/LoginLink';
import useSpecialFeaturesData from "../../hooks/useSpecialFeaturesData";

const ServicesListField = ({  }) => {
    const {
        services,
        isLoading,
        error,
        createService,
        updateService,
        deleteService,
        isCreating,
        isUpdating,
        isDeleting,
        createError,
        updateError,
        deleteError
    } = useServicesData();

    const { setCrudContext } = useCrudContext();

    const [expandedRows, setExpandedRows] = useState(new Set());
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({});
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    // Track visibility changes independently of edit state
    const [visibilityOverrides, setVisibilityOverrides] = useState({});

    // Use refs to always have access to latest state
    const formDataRef = useRef(formData);
    const editingServiceRef = useRef(editingService);
    const isCreatingNewRef = useRef(isCreatingNew);

    // Keep refs updated
    useEffect(() => {
        formDataRef.current = formData;
    }, [formData]);

    useEffect(() => {
        editingServiceRef.current = editingService;
    }, [editingService]);

    useEffect(() => {
        isCreatingNewRef.current = isCreatingNew;
    }, [isCreatingNew]);

    useEffect(() => {
        if (isCreatingNew || editingService) {
            setCrudContext({
                type: isCreatingNew ? 'create' : 'edit',
                itemType: 'service',
                onSave: () => handleSave(),
                onCancel: () => handleCancel(),
                isLoading: isCreatingNew ? isCreating : isUpdating,
                hasUnsavedChanges: hasUnsavedChanges
            });
        } else {
            setCrudContext(null);
        }
    }, [isCreatingNew, editingService, isCreating, isUpdating, hasUnsavedChanges, setCrudContext]);

    const toggleRow = useCallback((serviceId, service) => {
        // Don't allow expanding/editing services when creating a new one
        if (isCreatingNew) {
            return;
        }

        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(serviceId)) {
            // Collapsing - close this row
            newExpanded.delete(serviceId);
            if (editingService === serviceId) {
                setEditingService(null);
                setFormData({});
                setHasUnsavedChanges(false);
            }
        } else {
            // Expanding - close any other expanded rows and open this one
            newExpanded.clear();
            newExpanded.add(serviceId);

            // If another service was being edited or we're creating new, clear that state
            if (editingService && editingService !== serviceId) {
                setEditingService(null);
                setFormData({});
                setHasUnsavedChanges(false);
            }

            setEditingService(serviceId);
            const newFormData = {
                ...service,
                // Include any visibility override when starting edit mode
                is_visible: visibilityOverrides[serviceId] !== undefined ? visibilityOverrides[serviceId] : service.is_visible
            };
            setFormData(newFormData);
            setHasUnsavedChanges(false); // Start with no changes when opening
        }
        setExpandedRows(newExpanded);
    }, [expandedRows, editingService, visibilityOverrides, isCreatingNew]);

    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setHasUnsavedChanges(true); // Any change = unsaved changes
    }, []);

    const handleSave = () => {
        // Use refs to get the absolute latest state
        const currentFormData = formDataRef.current;
        const currentIsCreatingNew = isCreatingNewRef.current;
        const currentEditingService = editingServiceRef.current;

        const serviceData = {
            name: currentFormData.name,
            duration: parseInt(currentFormData.duration) || 60,
            is_visible: currentFormData.is_visible
        };

        if (currentIsCreatingNew) {
            createService(serviceData).then(() => {
                setIsCreatingNew(false);
                setFormData({});
                setHasUnsavedChanges(false);
                setCrudContext(null);
            }).catch((error) => {
                console.error('Error creating service:', error);
            });
        } else {
            updateService({ id: currentEditingService, data: serviceData }).then(() => {
                // Also collapse the expanded row to avoid rendering issues
                setExpandedRows(prev => {
                    const newExpanded = new Set(prev);
                    newExpanded.delete(currentEditingService);
                    return newExpanded;
                });
                setEditingService(null);
                setFormData({});
                setHasUnsavedChanges(false);
                // Clear visibility override for this service since it's now saved
                setVisibilityOverrides(prev => {
                    const newOverrides = { ...prev };
                    delete newOverrides[currentEditingService];
                    return newOverrides;
                });
                setCrudContext(null);
            }).catch((error) => {
                console.log(error)
                console.error('Error updating service:', error);
            });
        }
    };

    const handleCancel = () => {
        // Also collapse the expanded row when canceling
        if (editingService) {
            setExpandedRows(prev => {
                const newExpanded = new Set(prev);
                newExpanded.delete(editingService);
                return newExpanded;
            });
        }
        setEditingService(null);
        setIsCreatingNew(false);
        setFormData({});
        setHasUnsavedChanges(false);

        setCrudContext(null);
    };


    const handleAdd = useCallback(() => {
        setIsCreatingNew(true);
        setFormData({
            name: '',
            duration: '',
            is_visible: true
        });
        setHasUnsavedChanges(false);

        setCrudContext({
            type: 'create',
            itemType: 'service',
            onSave: handleSave,
            onCancel: handleCancel,
            isLoading: isCreating,
            hasUnsavedChanges: false
        });
    }, [isCreating, setCrudContext]);

    const handleDelete = useCallback((serviceId) => {
        if (window.confirm(__('Are you sure you want to delete this service?', 'simplybook'))) {
            deleteService(serviceId).then(() => {
                setEditingService(null);
                setFormData({});
                setHasUnsavedChanges(false);
            }).catch((error) => {
                console.error('Error deleting service:', error);
            });
        }
    }, [deleteService]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2">{__('Loading services...', 'simplybook')}</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 p-4 bg-red-50 rounded-md">
                {__('Error loading services: ', 'simplybook')} {error.message}
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={isCreatingNew ? handleCancel : handleAdd}
                        disabled={editingService}
                        className={`flex items-center justify-center rounded-full transition-all duration-200 px-3 py-1 text-sm font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                            isCreatingNew 
                                ? 'bg-tertiary text-white hover:bg-tertiary-light hover:text-tertiary'
                                : 'bg-primary text-white hover:bg-primary-dark'
                        }`}
                    >
                        <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
                        {isCreatingNew ? __('Cancel', 'simplybook') : __('Add Service', 'simplybook')}
                    </button>
                </div>
            </div>

            {/* Add New Service Form */}
            {isCreatingNew && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h4 className="text-md font-medium mb-4">{__('Add New Service', 'simplybook')}</h4>
                    <ServiceForm
                        formData={formData}
                        onChange={handleInputChange}
                        isLoading={isCreating}
                        error={createError}
                        serviceId={null}
                    />
                </div>
            )}

            {/* Services List */}
            <div className="space-y-6">
                {services.filter(service => service != null).map((service) => (
                    <ServiceRow
                        key={service.id}
                        service={service}
                        services={services}
                        isExpanded={expandedRows.has(service.id)}
                        isEditing={editingService === service.id}
                        isCreatingNew={isCreatingNew}
                        onToggle={() => toggleRow(service.id, service)}
                        onDelete={() => handleDelete(service.id)}
                        formData={editingService === service.id && formData ? formData : null}
                        onChange={handleInputChange}
                        visibilityOverrides={visibilityOverrides}
                        onVisibilityChange={(value) => {
                            if (editingService === service.id) {
                                // Already editing - update the form data
                                handleInputChange('is_visible', value);
                            } else {
                                // Not editing - update visibility override and trigger unsaved changes
                                setVisibilityOverrides(prev => ({
                                    ...prev,
                                    [service.id]: value
                                }));
                                // Trigger CRUD context to show unsaved changes
                                setCrudContext({
                                    type: 'edit',
                                    itemType: 'service',
                                    onSave: () => {
                                        // Create service data with the visibility change
                                        const serviceData = {
                                            ...service,
                                            is_visible: value
                                        };
                                        updateService({ id: service.id, data: serviceData }).then(() => {
                                            setVisibilityOverrides(prev => {
                                                const newOverrides = { ...prev };
                                                delete newOverrides[service.id];
                                                return newOverrides;
                                            });
                                            setCrudContext(null);
                                        });
                                    },
                                    onCancel: () => {
                                        setVisibilityOverrides(prev => {
                                            const newOverrides = { ...prev };
                                            delete newOverrides[service.id];
                                            return newOverrides;
                                        });
                                        setCrudContext(null);
                                    },
                                    isLoading: isUpdating,
                                    hasUnsavedChanges: true
                                });
                            }
                        }}
                        isLoading={isUpdating || isDeleting}
                        error={updateError || deleteError}
                    />
                ))}
            </div>

            {services.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    {__('No services found. Click "Add Service" to create your first service.', 'simplybook')}
                </div>
            )}
        </div>
    );
};

const ServiceRow = ({
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

    const handleVisibilityToggle = (e) => {
        e.stopPropagation();
        if (onVisibilityChange) {
            onVisibilityChange(e.target.checked);
        }
    };

    // Check visibility in order: form data (if editing) -> visibility overrides -> original data
    const currentVisibility = isEditing && formData
        ? formData.is_visible
        : visibilityOverrides[service.id] !== undefined
        ? visibilityOverrides[service.id]
        : service.is_visible;

    // Count visible services (considering form state and visibility overrides)
    const visibleServicesCount = services.filter(s => {
        if (isEditing && s.id === service.id) {
            return currentVisibility;
        }
        // Check visibility overrides first, then original data
        return visibilityOverrides[s.id] !== undefined ? visibilityOverrides[s.id] : s.is_visible;
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
                <div className="flex items-center flex-1">
                    <div className="text-sm font-medium text-gray-900">{service.name}</div>
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

const ServiceForm = ({ formData, onChange, error, serviceId }) => {

    const {isPluginActive} = useSpecialFeaturesData();

    if (!formData) {
        return <div className="text-gray-500">Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('Service name', 'simplybook')} *
                </label>
                <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => onChange('name', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('Service duration (minutes)', 'simplybook')}
                </label>
                <input
                    type="number"
                    min="1"
                    value={formData.duration || ''}
                    onChange={(e) => onChange('duration', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="60"
                />
            </div>
            {/* Edit All Properties Button */}
            {serviceId && (
                <div className="col-span-full mt-4">
                    <LoginLink
                        page={`/v2/management/#services/edit/details/${serviceId}`}
                        className="inline-flex items-center justify-center rounded-full transition-all duration-200 px-4 py-2 bg-tertiary text-white hover:bg-tertiary-light hover:text-tertiary text-sm font-bold"
                    >
                        {__('Edit All Properties', 'simplybook')}
                    </LoginLink>
                </div>
            )}
            {error && (
                <div className="col-span-full text-red-600 text-sm">
                    {error.message}
                </div>
            )}
        </div>
    );
};


export default ServicesListField;