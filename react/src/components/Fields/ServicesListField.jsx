import React, { useState, useEffect, useCallback, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import useServicesData from '../../hooks/useServicesData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { useCrudContext } from '../../routes/settings/$settingsId.lazy';

const ServicesListField = ({ setting, control, setValue, getValues, reset }) => {
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
    }, [isCreatingNew, editingService, isCreating, isUpdating, setCrudContext]);

    const toggleRow = useCallback((serviceId, service) => {
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
            
            // If another service was being edited, clear that state
            if (editingService && editingService !== serviceId) {
                setEditingService(null);
                setFormData({});
                setHasUnsavedChanges(false);
            }
            
            setEditingService(serviceId);
            setFormData({ ...service });
            setHasUnsavedChanges(false);
        }
        setExpandedRows(newExpanded);
    }, [expandedRows, editingService]);

    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setHasUnsavedChanges(true);
    }, []);

    const handleSave = () => {
        // Use refs to get the absolute latest state
        const currentFormData = formDataRef.current;
        const currentIsCreatingNew = isCreatingNewRef.current;
        const currentEditingService = editingServiceRef.current;

        const serviceData = {
            name: currentFormData.name,
            description: currentFormData.description || '',
            price: parseFloat(currentFormData.price) || 0,
            deposit_price: parseFloat(currentFormData.deposit_price) || 0,
            tax_id: currentFormData.tax_id || '',
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
                setCrudContext(null);
            }).catch((error) => {
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
            description: '',
            price: '',
            deposit_price: '',
            tax_id: '',
            duration: 60,
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
                <h3 className="text-lg font-medium">{__('Services', 'simplybook')}</h3>
                <button
                    type="button"
                    onClick={handleAdd}
                    disabled={isCreatingNew || editingService}
                    className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
                    {__('Add Service', 'simplybook')}
                </button>
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
                        onToggle={() => toggleRow(service.id, service)}
                        onDelete={() => handleDelete(service.id)}
                        formData={editingService === service.id && formData ? formData : null}
                        onChange={handleInputChange}
                        onVisibilityChange={(value) => {
                            // If not editing, start editing mode first
                            if (editingService !== service.id) {
                                setEditingService(service.id);
                                setExpandedRows(prev => new Set([...prev, service.id]));
                                const newFormData = {
                                    ...service,
                                    is_visible: value
                                };
                                setFormData(newFormData);
                                setHasUnsavedChanges(true);
                            } else {
                                // Already editing, just update the value
                                handleInputChange('is_visible', value);
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
                        onToggle,
                        onDelete,
                        formData,
                        onChange,
                        onVisibilityChange,
                        isLoading,
                        error
                    }) => {
    const formatPrice = (price) => {
        return price ? `$${parseFloat(price).toFixed(2)}` : '-';
    };

    const formatDuration = (duration) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;

        if (hours > 0 && minutes > 0) {
            return `${hours}h ${minutes}m`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else {
            return `${minutes}m`;
        }
    };

    const handleVisibilityToggle = (e) => {
        e.stopPropagation();
        if (onVisibilityChange) {
            onVisibilityChange(e.target.checked);
        }
    };

    const currentVisibility = isEditing && formData ? formData.is_visible : service.is_visible;
    
    // Count visible services (considering current form state if editing)
    const visibleServicesCount = services.filter(s => {
        if (isEditing && s.id === service.id) {
            return currentVisibility;
        }
        return s.is_visible;
    }).length;
    
    // Disable toggle if this is the last visible service and we're trying to hide it
    const isToggleDisabled = currentVisibility && visibleServicesCount <= 1;
    
    // Disable delete if this is the last service
    const isDeleteDisabled = services.length <= 1;

    return (
        <div className="bg-gray-50 border border-gray-300 rounded-lg shadow-sm mb-6">
            {/* Main row */}
            <div 
                className="flex items-center justify-between p-4 hover:bg-gray-100 rounded-t-lg cursor-pointer"
                onClick={onToggle}
            >
                {/* Left side: Service info */}
                <div className="flex items-center flex-1">
                    <div className="text-sm font-medium text-gray-900">{service.name}</div>
                </div>
                
                {/* Right side: Actions */}
                <div className="flex items-center space-x-3">
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
                        className="flex items-center h-6"
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
                    />
                </div>
            )}
        </div>
    );
};

const ServiceForm = ({ formData, onChange, isLoading, error }) => {
    if (!formData) {
        return <div className="text-gray-500">Loading...</div>;
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('Name', 'simplybook')} *
                </label>
                <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => onChange('name', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('Price', 'simplybook')}
                </label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price || ''}
                    onChange={(e) => onChange('price', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('Deposit Price', 'simplybook')}
                </label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.deposit_price || ''}
                    onChange={(e) => onChange('deposit_price', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('Duration (minutes)', 'simplybook')}
                </label>
                <input
                    type="number"
                    min="1"
                    value={formData.duration || 60}
                    onChange={(e) => onChange('duration', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('Tax ID', 'simplybook')}
                </label>
                <input
                    type="text"
                    value={formData.tax_id || ''}
                    onChange={(e) => onChange('tax_id', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('Description', 'simplybook')}
                </label>
                <textarea
                    value={formData.description || ''}
                    onChange={(e) => onChange('description', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            {error && (
                <div className="col-span-full text-red-600 text-sm">
                    {error.message}
                </div>
            )}
        </div>
    );
};


export default ServicesListField;