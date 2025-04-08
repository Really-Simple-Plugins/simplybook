import clsx from "clsx";

const BlockHeading = ({ title, controls, className = "", help = "" }) => {
    let titleSpacing = (help ? "pt-4" : "py-4");

    return (
        <>
            <div className={clsx(className, "flex items-center justify-between p-2", titleSpacing)}>
                <h2 className="text-base font-bold">{title}</h2>
                {controls}
            </div>
            {help && (
                <div className="px-5 py-2 text-sm text-gray-500">
                    {help}
                </div>
            )}
        </>
    );
};

BlockHeading.displayName = "BlockHeading";

export default BlockHeading;