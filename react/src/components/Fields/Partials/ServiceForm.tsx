import React from "react";
import LoginLink from "../../Common/LoginLink";
import { __ } from "@wordpress/i18n";
import useSpecialFeaturesData from "../../../hooks/useSpecialFeaturesData";

type ServiceFormProps = {
    formData: {
        name: string,
        duration: string,
        is_visible: boolean,
    },
    onChange: (type: string, target: string) => void,
    isLoading: boolean,
    error: {
        message: string
    },
    serviceId: number,
}

const ServiceForm: React.FC<ServiceFormProps> = ({ formData, onChange, isLoading, error, serviceId }) => {
    const { isPluginActive } = useSpecialFeaturesData();

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

export default ServiceForm;