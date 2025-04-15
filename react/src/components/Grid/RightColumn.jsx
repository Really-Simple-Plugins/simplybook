
import clsx from "clsx"

const RightColumn = ({ 
    className,
    children 
}) => {
    return (
        <div className={clsx("right-column w-full flex", className)}>
            {children}
        </div>
    )
}

RightColumn.displayName = "RightColumn"

export default RightColumn;
