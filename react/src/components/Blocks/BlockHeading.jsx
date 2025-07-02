import clsx from "clsx";

const BlockHeading = ({ title, controls, className = "", help = "" }) => {
    let titleSpacing = (help ? "pt-4" : "py-4");

    return (
        <>
            <div className={clsx(className, "flex items-center justify-between px-4 py-5", titleSpacing)}>
                <h2 className="text-lg font-semibold m-0">{title}</h2>
                {controls}
            </div>
            {help && (
                <div className="px-4 pb-4 text-sm text-gray-500">
                    {help}
                </div>
            )}
        </>
    );
};

BlockHeading.displayName = "BlockHeading";

export default BlockHeading;