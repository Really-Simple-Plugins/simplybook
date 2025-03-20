
import clsx from "clsx"

const RightColumn = ({ 
    className,
    children 
}) => {
    return (
        <div className={clsx(className, "right-column")}>
            {children}
        </div>
    )
}

RightColumn.displayName = "RightColumn"

export default RightColumn;
