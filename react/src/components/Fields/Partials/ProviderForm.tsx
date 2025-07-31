import React from "react";
import LoginLink from '../../Common/LoginLink';
import { __ } from '@wordpress/i18n';
import { DataError } from "../../../api/helpers/DataError";

type ProviderFormProps = {
    formData: {
        name: string,
        email: string,
        phone: string,
        qty: number,
        description: string,
    },
    onChange: (type: string, target: string) => void,
    isLoading: boolean,
    error: DataError,
    providerId: number,
}

const ProviderForm: React.FC<ProviderFormProps> = ({ formData, onChange, isLoading, error, providerId }) => {
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

export default ProviderForm;