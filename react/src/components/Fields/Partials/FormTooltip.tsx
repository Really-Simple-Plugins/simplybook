import React from 'react'
import Icon from '../../Common/Icon';
import { Tooltip } from 'react-tooltip';
import { FormTooltipProps } from '../../../types/fields/FormTooltipProps';

const FormTooltip: React.FC<FormTooltipProps> = ({
    message,
    type,
    iconType = "",
    iconColor = "",
}) => {

    if (!iconType || !iconColor) {
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
    }

    if (!message) {
        return null;
    }

    return (
        <>
            <Icon
                name={iconType}
                color={iconColor}
                className={"tooltip-icon ms-2"}
                data-tooltip-id={"field-tooltip"}
                data-tooltip-content={message}
                aria-hidden={"false"}
                aria-label={message}
            />
            <Tooltip
                id={"field-tooltip"}
                place={"bottom"}
                openEvents={{
                    mouseover: true,
                    focus: true,
                    click: true
                }}
            />
        </>
    )
}

export default FormTooltip;