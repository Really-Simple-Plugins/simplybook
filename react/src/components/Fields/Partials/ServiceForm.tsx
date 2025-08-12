import React, { useEffect, useState } from "react";
import LoginLink from "../../Common/LoginLink";
import { __ } from "@wordpress/i18n";
import clsx from "clsx";
import { useCrudContext } from "../../../context/CrudContext";
import Service from "../../../types/Service";
import useSpecialFeaturesData from "../../../hooks/useSpecialFeaturesData";

type ServiceFormProps = {
    service: Service,
    serviceId: Service['id'],
}

const ServiceForm: React.FC<ServiceFormProps> = ({ serviceId, service  }) => {
    if (!service) {
        return <div className="text-gray-500">Loading...</div>;
    }
    //TODO
    const { isPluginActive } = useSpecialFeaturesData();
    const { crudState, dispatch } = useCrudContext();
    const [currentServiceState, setCurrentServiceState] = useState<Service>(service);

    useEffect(() => {
        const serviceInUnsavedList = crudState.unsavedServices?.find((serviceToTest) => serviceToTest.id === serviceId);
        setCurrentServiceState(serviceInUnsavedList ?? service);
    }, [crudState.unsavedServices]);


    useEffect(()=>{
        const errorsForThisService = crudState.serviceErrors ? crudState.serviceErrors[serviceId] : null;
        if (errorsForThisService && !crudState.servicesHasUnsavedChanges) {
            dispatch({dispatchType: 'clearAllErrorsForItem', change: {item: {id: serviceId}}});
        }
    }, [crudState.serviceErrors, crudState.servicesHasUnsavedChanges]);

    const handleInputChange = (field : string, value: string | number) => {
        const changesToUpdate = { id: serviceId, [field]: value };
        const errorsForThisService = crudState.serviceErrors ? crudState.serviceErrors[serviceId] : {};
        const fieldHasErrors = errorsForThisService ? Object.keys(errorsForThisService).includes(field) : false;
        if (fieldHasErrors) {
            dispatch({dispatchType: 'clearErrorsForField', change: {item: {id: serviceId, [field]: ''}}});
        }
        dispatch({ dispatchType: 'unsavedChangesToServices', change: {item: changesToUpdate }});
    };

    const validateValue = (field: string, value: string): boolean => {
        let isValueValid = false;
        let errorMessage;
        switch (field) {
            case 'name': {
                isValueValid = value !== '';
                errorMessage = __('Service name is required', 'simplybook');
                break;
            }
            case 'duration': {
                const valueToNumber = Number(value);
                isValueValid = !(isNaN(valueToNumber));
                errorMessage = __('Please enter a valid number that is a multiple of your selected timeframe', 'simplybook');
                break;
            }
        }

        if (!isValueValid && errorMessage) {
            const errors = { [field]:  errorMessage};
            dispatch({dispatchType: 'errorsOnFields', change: {item: {id: serviceId, ...errors}}});
        } else if (crudState.serviceErrors && crudState.serviceErrors[serviceId]) {
            dispatch({dispatchType: 'clearErrorsForField', change: {item: {id: serviceId, [field]: ''}}});
        }
        return isValueValid;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('Service name', 'simplybook')} *
                </label>
                <input
                    type="text"
                    value={currentServiceState.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={clsx(
                        "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                        crudState.serviceErrors && crudState.serviceErrors[serviceId] ? crudState.serviceErrors[serviceId]['name'] && "ring-2 ring-red-600" : null)}
                    required
                    onBlur={(e) => {
                        validateValue('name', e.target.value.trim());
                    }}
                />
                {crudState.serviceErrors && crudState.serviceErrors[serviceId] ? crudState.serviceErrors[serviceId]['name'] && (
                    <div>
                        <span className={"text-red-600 ml-[1px]"}>{crudState.serviceErrors[serviceId]['name']}</span>
                    </div>
                ) : null}
            </div>
            <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('Service duration (minutes)', 'simplybook')}
                </label>
                <input
                    type="text"
                    pattern="[0-9]"
                    placeholder="60"
                    value={currentServiceState.duration}
                    onChange={(e) => {
                        const trimmedValue = e.target.value.trim();
                        const isValid = trimmedValue === '' || validateValue('duration', trimmedValue);
                        if (isValid) {
                            handleInputChange('duration', trimmedValue);
                        }
                    }}
                    onBlur={(e) => {
                        validateValue('duration', e.target.value.trim());
                    }}
                    className={clsx(
                        "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                        crudState.serviceErrors && crudState.serviceErrors[serviceId] ? crudState.serviceErrors[serviceId]['duration'] && "ring-2 ring-red-600" : null)}
                />
                {crudState.serviceErrors && crudState.serviceErrors[serviceId] ? crudState.serviceErrors[serviceId]['duration'] && (
                    <div>
                        <span className={"text-red-600 ml-[1px]"}>{crudState.serviceErrors[serviceId]['duration']}</span>
                    </div>
                ): null}
            </div>
            {/* Edit All Properties Button */}
            {serviceId && serviceId !== "new" && (
                <div className="col-span-full mt-4">
                    <LoginLink
                        iconName="square-arrow-up-right"
                        iconClass="px-2"
                        page={`/v2/management/#services/edit/details/${serviceId}`}
                        className="flex items-center justify-center rounded-full transition-all duration-200 px-3 py-1 bg-tertiary text-white hover:bg-tertiary-light hover:text-tertiary text-sm font-bold"
                    >
                        {__('Edit All Properties', 'simplybook')}
                    </LoginLink>
                </div>
            )}
            {crudState.error && (
                <div className="col-span-full text-red-600 text-sm">
                    {crudState.error}
                </div>
            )}
        </div>
    );
};

export default ServiceForm;