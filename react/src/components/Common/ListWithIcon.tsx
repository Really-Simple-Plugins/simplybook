import React from "react";
import Icon from "./Icon";
import clsx from "clsx";
import { ListWithIcon as ListWithIconProps } from "../../types/ListWithIcon";


const ListWithIcon: React.FC<ListWithIconProps> = ({ 
    className,
    iconName, 
    iconSize,
    iconClass,
    iconColor,
    children
}) => {
    return (
        <>
            <li className={clsx("flex justify-center items-center text-base font-medium mx-2", className)}>
                <Icon
                    className={iconClass}
                    name={iconName} 
                    size={iconSize}
                    style={{ color: iconColor }}
                />
                <span className="ml-2 text-black">{children}</span>
            </li>
        </>
    );
};

export default ListWithIcon;