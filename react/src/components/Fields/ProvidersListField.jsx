import React, { useState, useEffect, useCallback, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import useProviderData from '../../hooks/useProviderData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCrudContext } from '../../context/CrudContext';


const ProvidersListField = ({  }) => {
    const {
        providers,
        isLoading,
        error,
        createProvider,
        updateProvider,
        deleteProvider,
        isCreating,
        isUpdating,
        isDeleting,
        createError,
        updateError,
        deleteError
    } = useProviderData();

    const { setCrudContext } = useCrudContext();

    const [expandedRows, setExpandedRows] = useState(new Set());
    const [editingProvider, setEditingProvider] = useState(null);
    const [formData, setFormData] = useState({});
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    // Track visibility changes independently of edit state
    const [visibilityOverrides, setVisibilityOverrides] = useState({});

    const formDataRef = useRef(formData);
    const editingProviderRef = useRef(editingProvider);
    const isCreatingNewRef = useRef(isCreatingNew);

    useEffect(() => {
        formDataRef.current = formData;
    }, [formData]);

    useEffect(() => {
        editingProviderRef.current = editingProvider;
    }, [editingProvider]);

    useEffect(() => {
        isCreatingNewRef.current = isCreatingNew;
    }, [isCreatingNew]);

    useEffect(() => {
        if (isCreatingNew || editingProvider) {
            setCrudContext({
                type: isCreatingNew ? 'create' : 'edit',
                itemType: 'provider',
                onSave: () => handleSave(),
                onCancel: () => handleCancel(),
                isLoading: isCreatingNew ? isCreating : isUpdating,
                hasUnsavedChanges: hasUnsavedChanges
            });
        } else {
            setCrudContext(null);
        }
    }, [isCreatingNew, editingProvider, isCreating, isUpdating, hasUnsavedChanges, setCrudContext]);

    const toggleRow = useCallback((providerId, provider) => {
        // Don't allow expanding/editing providers when creating a new one
        if (isCreatingNew) {
            return;
        }
        
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(providerId)) {
            // Collapsing - close this row
            newExpanded.delete(providerId);
            if (editingProvider === providerId) {
                setEditingProvider(null);
                setFormData({});
                setHasUnsavedChanges(false);
            }
        } else {
            // Expanding - close any other expanded rows and open this one
            newExpanded.clear();
            newExpanded.add(providerId);
            
            // If another provider was being edited or we're creating new, clear that state
            if (editingProvider && editingProvider !== providerId) {
                setEditingProvider(null);
                setFormData({});
                setHasUnsavedChanges(false);
            }
            
            
            setEditingProvider(providerId);
            const newFormData = {
                ...provider,
                qty: provider.qty || provider.quantity || 1,
                // Include any visibility override when starting edit mode
                is_visible: visibilityOverrides[providerId] !== undefined ? visibilityOverrides[providerId] : provider.is_visible
            };
            setFormData(newFormData);
            setHasUnsavedChanges(false); // Start with no changes when opening
        }
        setExpandedRows(newExpanded);
    }, [expandedRows, editingProvider, visibilityOverrides, isCreatingNew]);

    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setHasUnsavedChanges(true); // Any change = unsaved changes
    }, []);

    const handleSave = () => {
        const currentFormData = formDataRef.current;
        const currentIsCreatingNew = isCreatingNewRef.current;
        const currentEditingProvider = editingProviderRef.current;

        if (!currentFormData.name) {
            console.error('No provider name provided');
            return;
        }
        
        // Validate email if provided
        if (currentFormData.email && currentFormData.email.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(currentFormData.email.trim())) {
                console.error('Invalid email format');
                alert(__('Please enter a valid email address (e.g., example@domain.com)', 'simplybook'));
                return;
            }
        }
        
        // Validate phone number if provided
        if (currentFormData.phone && currentFormData.phone.trim()) {
            const phonePattern = /^[+]?[0-9\s\-\(\)]{7,20}$/;
            if (!phonePattern.test(currentFormData.phone.trim())) {
                console.error('Invalid phone number format');
                alert(__('Please enter a valid phone number with country code (e.g., +31 123 456 789)', 'simplybook'));
                return;
            }
        }
        
        if (!currentIsCreatingNew && !currentEditingProvider) {
            if (!currentFormData.id) {
                console.error('No provider ID available for update');
                return;
            }
        }
        
        const providerData = {
            name: currentFormData.name,
            description: currentFormData.description || '',
            qty: Math.max(parseInt(currentFormData.qty) || 1, 1),
            email: currentFormData.email || '',
            phone: currentFormData.phone || '',
            is_visible: currentFormData.is_visible
        };

        if (currentIsCreatingNew) {
            createProvider(providerData).then(() => {
                setIsCreatingNew(false);
                setFormData({});
                setHasUnsavedChanges(false);
                setCrudContext(null);
            }).catch((error) => {
                console.error('Error creating provider:', error);
            });
        } else {
            const providerId = currentEditingProvider || currentFormData.id;
            updateProvider({ id: providerId, data: providerData }).then(() => {
                setExpandedRows(prev => {
                    const newExpanded = new Set(prev);
                    newExpanded.delete(providerId);
                    return newExpanded;
                });
                setEditingProvider(null);
                setFormData({});
                setHasUnsavedChanges(false);
                // Clear visibility override for this provider since it's now saved
                setVisibilityOverrides(prev => {
                    const newOverrides = { ...prev };
                    delete newOverrides[providerId];
                    return newOverrides;
                });
                setCrudContext(null);
            }).catch((error) => {
                console.error('Error updating provider:', error);
            });
        }
    };

    const handleCancel = () => {
        if (editingProvider) {
            setExpandedRows(prev => {
                const newExpanded = new Set(prev);
                newExpanded.delete(editingProvider);
                return newExpanded;
            });
        }
        setEditingProvider(null);
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
            qty: 1,
            email: '',
            phone: '',
            is_visible: true
        });
        setHasUnsavedChanges(false);
    }, []);

    const handleDelete = useCallback((providerId) => {
        if (window.confirm(__('Are you sure you want to delete this service provider?', 'simplybook'))) {
            deleteProvider(providerId).then(() => {
                setEditingProvider(null);
                setFormData({});
                setHasUnsavedChanges(false);
            }).catch((error) => {
                console.error('Error deleting provider:', error);
            });
        }
    }, [deleteProvider]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2">{__('Loading service providers...', 'simplybook')}</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 p-4 bg-red-50 rounded-md">
                {__('Error loading service providers: ', 'simplybook')} {error.message}
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
                        disabled={editingProvider}
                        className={`flex items-center justify-center rounded-full transition-all duration-200 px-3 py-1 text-sm font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                            isCreatingNew 
                                ? 'bg-tertiary text-white hover:bg-tertiary-light hover:text-tertiary'
                                : 'bg-primary text-white hover:bg-primary-dark'
                        }`}
                    >
                        <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
                        {isCreatingNew ? __('Cancel', 'simplybook') : __('Add Service Provider', 'simplybook')}
                    </button>
                </div>
            </div>

            {/* Add New Provider Form */}
            {isCreatingNew && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h4 className="text-md font-medium mb-4">{__('Add New Service Provider', 'simplybook')}</h4>
                    <ProviderForm
                        formData={formData}
                        onChange={handleInputChange}
                        isLoading={isCreating}
                        error={createError}
                        providerId={null}
                    />
                </div>
            )}

            {/* Providers List */}
            <div className="space-y-6">
                {providers.filter(provider => provider != null).map((provider) => (
                    <ProviderRow
                        key={provider.id}
                        provider={provider}
                        providers={providers}
                        isExpanded={expandedRows.has(provider.id)}
                        isEditing={editingProvider === provider.id}
                        isCreatingNew={isCreatingNew}
                        onToggle={() => toggleRow(provider.id, provider)}
                        onDelete={() => handleDelete(provider.id)}
                        formData={editingProvider === provider.id && formData ? formData : null}
                        onChange={handleInputChange}
                        visibilityOverrides={visibilityOverrides}
                        onVisibilityChange={(value) => {
                            if (editingProvider === provider.id) {
                                // Already editing - update the form data
                                handleInputChange('is_visible', value);
                            } else {
                                // Not editing - update visibility override and trigger unsaved changes
                                setVisibilityOverrides(prev => ({
                                    ...prev,
                                    [provider.id]: value
                                }));
                                // Trigger CRUD context to show unsaved changes
                                setCrudContext({
                                    type: 'edit',
                                    itemType: 'provider',
                                    onSave: () => {
                                        // Create provider data with the visibility change
                                        const providerData = {
                                            ...provider,
                                            is_visible: value
                                        };
                                        updateProvider({ id: provider.id, data: providerData }).then(() => {
                                            setVisibilityOverrides(prev => {
                                                const newOverrides = { ...prev };
                                                delete newOverrides[provider.id];
                                                return newOverrides;
                                            });
                                            setCrudContext(null);
                                        });
                                    },
                                    onCancel: () => {
                                        setVisibilityOverrides(prev => {
                                            const newOverrides = { ...prev };
                                            delete newOverrides[provider.id];
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

            {providers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    {__('No service providers found. Click "Add Service Provider" to create your first service provider.', 'simplybook')}
                </div>
            )}
        </div>
    );
};

export default ProvidersListField;