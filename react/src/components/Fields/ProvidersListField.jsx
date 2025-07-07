import React, { useState, useEffect, useCallback, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import useProviderData from '../../hooks/useProviderData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { useCrudContext } from '../../context/CrudContext';
import LoginLink from '../Common/LoginLink';

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

const ProviderRow = ({ 
    provider, 
    providers,
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
    error 
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
        : visibilityOverrides[provider.id] !== undefined 
        ? visibilityOverrides[provider.id] 
        : provider.is_visible;
    
    // Count visible providers (considering form state and visibility overrides)
    const visibleProvidersCount = providers.filter(p => {
        if (isEditing && p.id === provider.id) {
            return currentVisibility;
        }
        // Check visibility overrides first, then original data
        return visibilityOverrides[p.id] !== undefined ? visibilityOverrides[p.id] : p.is_visible;
    }).length;
    
    // Disable toggle if this is the last visible provider and we're trying to hide it
    const isToggleDisabled = currentVisibility && visibleProvidersCount <= 1;
    
    // Disable delete if this is the last provider
    const isDeleteDisabled = providers.length <= 1;

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
                {/* Left side: Provider info */}
                <div className="flex items-center flex-1">
                    <div className="text-sm font-medium text-gray-900">{provider.name}</div>
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
                        title={__('Delete Service Provider', 'simplybook')}
                    >
                        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                    </button>
                    
                    {/* Visibility Toggle */}
                    <div 
                        className=""
                        onClick={(e) => e.stopPropagation()}
                    >
                        <label 
                            className={clsx(
                                "relative inline-flex items-center",
                                isToggleDisabled ? "cursor-not-allowed" : "cursor-pointer"
                            )} 
                            title={
                                isToggleDisabled 
                                    ? __('Cannot hide the last visible service provider', 'simplybook')
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
                    <ProviderForm
                        formData={formData}
                        onChange={onChange}
                        isLoading={isLoading}
                        error={error}
                        providerId={provider.id}
                    />
                </div>
            )}
        </div>
    );
};

const ProviderForm = ({ formData, onChange, error, providerId }) => {
    if (!formData) {
        return <div className="text-gray-500">Loading...</div>;
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('Service provider name', 'simplybook')} *
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
                    {__('E-mail', 'simplybook')}
                </label>
                <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => onChange('email', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('Phone', 'simplybook')}
                </label>
                <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => onChange('phone', e.target.value)}
                    pattern="[+]?[0-9\s\-\(\)]{7,20}"
                    title={__('Please enter a valid phone number with country code (e.g., +31 123 456 789)', 'simplybook')}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+31 123 456 789"
                />
            </div>
            <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('How many clients can be served at the same time?', 'simplybook')}
                </label>
                <input
                    type="number"
                    min="1"
                    value={formData.qty || 1}
                    onChange={(e) => onChange('qty', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('Service provider description', 'simplybook')}
                </label>
                <textarea
                    value={formData.description || ''}
                    onChange={(e) => onChange('description', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            {/* Edit All Properties Button */}
            {providerId && (
                <div className="col-span-full mt-4">
                    <LoginLink
                        page={`/v2/management/#providers/edit/details/${providerId}`}
                        className="flex items-center justify-center rounded-full transition-all duration-200 px-3 py-1 bg-tertiary text-white hover:bg-tertiary-light hover:text-tertiary text-sm font-bold"
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


export default ProvidersListField;