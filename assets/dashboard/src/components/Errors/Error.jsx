import { __ } from "@wordpress/i18n";
const Error = ({error, ...props }) => {
    if (!error) {
        return null;
    }
    return (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">{__("Something went wrong!", "simplybook")}</strong>
            <span className="block sm:inline"><p>{error}</p></span>
        </div>
    );
};

export default Error;
