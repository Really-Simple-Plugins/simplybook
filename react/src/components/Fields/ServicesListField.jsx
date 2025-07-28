import React, { useState, useEffect, useCallback, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import useServicesData from '../../hooks/useServicesData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCrudContext } from '../../context/CrudContext';
import ServiceRow from './Partials/ServiceRow';
import ServiceForm from './Partials/ServiceForm';

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
            description: '',
            price: '',
            deposit_price: '',
            tax_id: '',
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

export default ServicesListField;