import React, {useEffect} from 'react'
import Icon from '../../Common/Icon';
import { Tooltip } from 'react-tooltip';
import { FormTooltipProps } from '../../../types/fields/FormTooltipProps';

const FormTooltip: React.FC<FormTooltipProps> = ({
    message,
    type,
}) => {

    let iconType = "";
    let iconColor = "";

    const tooltipIcon = (type: string) => {
        switch(type) {
            case "warning":
                iconType = "warning-circle";
                iconColor = "var(--color-yellow-500)";
            break;

            case "error":
                iconType = "warning-circle";
                iconColor = "var(--color-red-500)";
            break;

            default:
                iconType = "info-circle";
                iconColor = "var(--color-black-900)";
        }
    };

    // Initialize the switch with the type prop
    useEffect(() => {
        tooltipIcon(type);
    }, [type]);

    return (
        <>
            <Icon
                name={iconType}
                color={iconColor}
                className={"tooltip-icon ml-2"}
                data-tooltip-id={"field-tooltip"}
                data-tooltip-content={message}
            />
            <Tooltip
                id={"field-tooltip"}
                place={"bottom"}
            />
        </>
    )
}

export default FormTooltip;