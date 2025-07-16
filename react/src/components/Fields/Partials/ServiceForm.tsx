import LoginLink from "../../Common/LoginLink";
import { __ } from "@wordpress/i18n";

const ServiceForm = ({ formData, onChange, isLoading, error, serviceId }) => {
    if (!formData) {
        return <div className="text-gray-500">Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
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
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__('Service price', 'simplybook')}
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
                    {__('Service deposit price', 'simplybook')}
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
                    {__('Service description', 'simplybook')}
                </label>
                <textarea
                    value={formData.description || ''}
                    onChange={(e) => onChange('description', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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