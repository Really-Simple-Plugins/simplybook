import clsx from "clsx";
import React from "react";

const BlockFooter = ({ children, className = "" }) => {
    return (
        <div className={clsx("block-footer flex p-4", className)}>
            {children}
        </div>
    );
};

BlockFooter.displayName = "BlockFooter";
export default BlockFooter;