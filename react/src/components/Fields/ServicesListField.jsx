import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCrudContext } from '../../context/CrudContext';
import ServiceRow from './Partials/ServiceRow';
import ServiceForm from './Partials/ServiceForm';
import clsx from "clsx";

const ServicesListField = () => {
    const {crudState, dispatch } = useCrudContext();

    useEffect(()=> {
        console.log(crudState);
        console.log(crudState.isSaving);
    }, [crudState]);

    const handleCancelCreatingNew = () => {
        dispatch({dispatchType: "createNewCanceled"});
        dispatch({dispatchType: "clearAllErrorsForItem", change: {item: {id: "new"}}});
    };

    const defaultNewService = { id: "new", name: '', duration: 60 };

    const handleAdd = () => {
        dispatch({dispatchType: 'isCreatingNewChanged', change: { isCreatingNewService: true }});
        dispatch({dispatchType: 'unsavedChangesToServices', change: { item: defaultNewService}});
    };

    if (!crudState.services || crudState.isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2">{__('Loading services...', 'simplybook')}</span>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* If there's no services and we're not loading, render message, else render Services List */}
            {!crudState.isLoading && crudState.services && crudState.services.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    {__('No services found. Click "Add Service" to create your first service.', 'simplybook')}
                </div>
            ) : (
                <div className="space-y-6">
                    {crudState.services?.filter(service => service != null).map((service) => (
                        <ServiceRow
                            key={service.id}
                            service={service}
                            services={crudState.services}
                        />
                    ))}
                </div>
            )}

            {/* Create New Service Button */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={crudState.isCreatingNewService ? handleCancelCreatingNew : handleAdd}
                        disabled={crudState.isSaving}
                        className={clsx("flex items-center border border-gray-200 justify-center bg-gray-100 text-gray-900 hover:bg-gray-200 rounded-sm transition-all duration-200 px-3 py-1 text-sm cursor-pointer",
                            crudState.isSaving && "opacity-50 cursor-not-allowed pointer-events-none")}
                    >
                        <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2 text-gray-500" />
                        {crudState.isCreatingNewService ? __('Cancel New Service', 'simplybook') : __('Add Service', 'simplybook')}
                    </button>
                </div>
            </div>

            {/* Add New Service Form */}
            {crudState.isCreatingNewService && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h4 className="text-md font-medium mb-4">{__('Add New Service', 'simplybook')}</h4>
                    <ServiceForm
                        serviceId={"new"}
                        service={defaultNewService}
                    />
                </div>
            )}
        </div>
    );
};

export default ServicesListField;