import { forwardRef } from "react";

/**
 * HiddenField component
 * @param {string} id
 * @param {string} name

 */
const ListItem = forwardRef(
    ({ id, name, ...props }, ref) => {
        return (
            <>
                <div className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-md">
                    <div className="flex items-center space-x-3">
                        <div className="font-medium">{id}</div>
                        <div>{name}</div>
                    </div>
                    <div className="flex items-center">
                        <button className="px-3 py-1 text-blue-500 hover:text-blue-600 focus:outline-none">
                            Edit Service Provider
                        </button>
                        <div className="ml-4 relative">
                            <label className="sr-only">Toggle Service Provider</label>
                            <div className="w-10 h-5 bg-gray-400 rounded-full shadow-inner"></div>
                            <div
                                className="absolute inset-y-0 left-0 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out translate-x-0"></div>
                        </div>
                    </div>
                </div>

            </>
        );
    },
);

ListItem.displayName = 'ListItem';
export default ListItem;
