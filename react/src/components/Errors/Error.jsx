import {Link} from "@tanstack/react-router";

const Error = ({
    error,
    errorHeading,
   resolve = {},
    ...props
}) => {

    if (!error) {
        return null;
    }

    return (
        <div className="animate-floatIn mt-4 bg-red-100  border-red-500 text-red-500 border-2 px-4 py-3 rounded relative shadow-lg" role="alert">
            <strong className="font-bold">{errorHeading}</strong>
            <p className="m-0 mt-2">
                {error}
            </p>
            {resolve && (
                <Link
                    className="mt-2 text-red-500 underline"
                    onClick={resolve?.callback}
                >
                    {resolve?.label}
                </Link>
            )}
        </div>
    );
};

export default Error;