import { __ } from "@wordpress/i18n";

const Error = ({
    error,
    errorHeading, 
    ...props 
}) => {

    if (!error) {
        return null;
    }

    return (
        <div className="animate-floatIn mt-4 bg-red-100  border-red-500 text-red-500 border-2 px-4 py-3 rounded relative shadow-lg" role="alert">
            <strong className="font-bold">{errorHeading}</strong>
            <p className="m-0 mt-[0.5rem]">{error}</p>
        </div>
    );
};

export default Error;
