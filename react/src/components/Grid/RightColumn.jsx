
import clsx from "clsx"

const RightColumn = ({
    className,
    style,
    children
}) => {
    return (
        <div
            className={clsx("right-column w-full flex", className)}
            style={style}
        >
            {children}
        </div>
    )
}

RightColumn.displayName = "RightColumn"

export default RightColumn;