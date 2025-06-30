import React, { useState, useEffect, useCallback, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import useProviderData from '../../hooks/useProviderData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { useCrudContext } from '../../routes/settings/$settingsId.lazy';

const ProvidersListField = ({ setting, control, setValue, getValues, reset }) => {
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
    }, [isCreatingNew, editingProvider, isCreating, isUpdating, setCrudContext]);

    const toggleRow = useCallback((providerId, provider) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(providerId)) {
            newExpanded.delete(providerId);
            setEditingProvider(null);
            setFormData({});
            setHasUnsavedChanges(false);
        } else {
            newExpanded.add(providerId);
            setEditingProvider(providerId);
            const newFormData = {
                ...provider,
                qty: provider.qty || provider.quantity || 1,
                color: provider.color || '#3b82f6'
            };
            setFormData(newFormData);
            setHasUnsavedChanges(false);
        }
        setExpandedRows(newExpanded);
    }, [expandedRows]);

    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setHasUnsavedChanges(true);
    }, []);

    const handleSave = () => {
        const currentFormData = formDataRef.current;
        const currentIsCreatingNew = isCreatingNewRef.current;
        const currentEditingProvider = editingProviderRef.current;

        if (!currentFormData.name) {
            console.error('No provider name provided');
            return;
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
            color: (currentFormData.color && currentFormData.color.trim()) || '#3b82f6',
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
            color: '#3b82f6',
            is_visible: true
        });
        setHasUnsavedChanges(false);
    }, []);

    const handleDelete = useCallback((providerId) => {
        if (window.confirm(__('Are you sure you want to delete this provider?', 'simplybook'))) {
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
                <span className="ml-2">{__('Loading providers...', 'simplybook')}</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 p-4 bg-red-50 rounded-md">
                {__('Error loading providers: ', 'simplybook')} {error.message}
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{__('Providers', 'simplybook')}</h3>
                <button
                    type="button"
                    onClick={handleAdd}
                    disabled={isCreatingNew || editingProvider}
                    className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
                    {__('Add Provider', 'simplybook')}
                </button>
            </div>

            {/* Add New Provider Form */}
            {isCreatingNew && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h4 className="text-md font-medium mb-4">{__('Add New Provider', 'simplybook')}</h4>
                    <ProviderForm
                        formData={formData}
                        onChange={handleInputChange}
                        isLoading={isCreating}
                        error={createError}
                    />
                </div>
            )}

            {/* Providers Table */}
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {__('Provider', 'simplybook')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {__('Contact', 'simplybook')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {__('Status', 'simplybook')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {__('Actions', 'simplybook')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {providers.filter(provider => provider != null).map((provider) => (
                            <ProviderRow
                                key={provider.id}
                                provider={provider}
                                isExpanded={expandedRows.has(provider.id)}
                                isEditing={editingProvider === provider.id}
                                onToggle={() => toggleRow(provider.id, provider)}
                                onDelete={() => handleDelete(provider.id)}
                                formData={editingProvider === provider.id ? formData : null}
                                onChange={handleInputChange}
                                isLoading={isUpdating || isDeleting}
                                error={updateError || deleteError}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {providers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    {__('No providers found. Click "Add Provider" to create your first provider.', 'simplybook')}
                </div>
            )}
        </div>
    );
};

const ProviderRow = ({ 
    provider, 
    isExpanded, 
    isEditing, 
    onToggle, 
    onDelete, 
    formData, 
    onChange, 
    isLoading, 
    error 
}) => {
    return (
        <>
            <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={onToggle}
                            className="mr-2 p-1 rounded hover:bg-gray-200"
                        >
                            {isExpanded ? (
                                <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
                            ) : (
                                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
                            )}
                        </button>
                        <div className="flex items-center">
                            <div 
                                className="w-4 h-4 rounded-full mr-3"
                                style={{ backgroundColor: provider.color }}
                            ></div>
                            <div>
                                <div className="text-sm font-medium text-gray-900">{provider.name}</div>
                                <div className="text-sm text-gray-500">{provider.description}</div>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{provider.email}</div>
                    <div className="text-sm text-gray-500">{provider.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                        "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                        provider.is_visible 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-800"
                    )}>
                        {provider.is_visible ? __('Visible', 'simplybook') : __('Hidden', 'simplybook')}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                        type="button"
                        onClick={onDelete}
                        disabled={isEditing || isLoading}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                    </button>
                </td>
            </tr>
            {isExpanded && (
                <tr>
                    <td colSpan="4" className="px-6 py-4 bg-gray-50">
                        <ProviderForm
                            formData={formData}
                            onChange={onChange}
                            isLoading={isLoading}
                            error={error}
                        />
                    </td>
                </tr>
            )}
        </>
    );
};

const ProviderForm = ({ formData, onChange, isLoading, error }) => {
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
                    {__('Email', 'simplybook')}
                </label>
                <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => onChange('email', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('Phone', 'simplybook')}
                </label>
                <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => onChange('phone', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('Quantity', 'simplybook')}
                </label>
                <input
                    type="number"
                    min="1"
                    value={formData.qty || 1}
                    onChange={(e) => onChange('qty', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('Color', 'simplybook')}
                </label>
                <input
                    type="color"
                    value={formData.color || '#3b82f6'}
                    onChange={(e) => onChange('color', e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={formData.is_visible || false}
                        onChange={(e) => onChange('is_visible', e.target.checked)}
                        className="mr-2"
                    />
                    {__('Visible', 'simplybook')}
                </label>
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


export default ProvidersListField;