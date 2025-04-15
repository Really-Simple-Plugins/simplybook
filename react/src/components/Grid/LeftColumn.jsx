
import clsx from "clsx"

const LeftColumn = ({ 
    className,
    children 
}) => {
    return (
        <div className={clsx("left-column flex", className)}>
            {children}
        </div>
    )
}

LeftColumn.displayName = "LeftColumn"

export default LeftColumn;
