
import clsx from "clsx"

const LeftColumn = ({ 
    className,
    children 
}) => {
    return (
        <div className={clsx(className, "left-column")}>
            {children}
        </div>
    )
}

LeftColumn.displayName = "LeftColumn"

export default LeftColumn;
