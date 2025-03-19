
import clsx from "clsx"

const LeftColumn = ({ 
    className,
    children 
}) => {
    return (
        <div className={clsx(className, "col-span-4 col-start-2")}>
            {children}
        </div>
    )
}

LeftColumn.displayName = "LeftColumn"

export default LeftColumn;
