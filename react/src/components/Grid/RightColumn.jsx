
import clsx from "clsx"

const RightColumn = ({ 
    className,
    children 
}) => {
    return (
        <div className="col-span-4">
            {children}
        </div>
    )
}

RightColumn.displayName = "RightColumn"

export default RightColumn;
