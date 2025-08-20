import clsx from "clsx";

const BlockFooter = ({ children, className = "" }) => {
    return (
        <div className={clsx("block-footer flex p-4", className)}>
            {children}
        </div>
    );
};

BlockFooter.displayName = "BlockFooter";
export default BlockFooter;