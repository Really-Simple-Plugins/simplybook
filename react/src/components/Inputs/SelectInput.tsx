import React from "react";
import * as Select from "@radix-ui/react-select";
import Icon from "../Common/Icon";
import { SelectOption } from "../../types/inputs/SelectOption";
import { SelectInputProps } from "../../types/inputs/SelectInputProps";
import {__} from "@wordpress/i18n";
import clsx from "clsx";

/**
 * Styled select input component
 * @param props - Props for the select component
 * @returns {JSX.Element} The rendered select component
 */
const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
    ({
        name,
        fieldState,
        value,
        onChange,
        options = [],
        ...props
    }, ref) => {
        // Normalize options if it's an object
        const normalizedOptions: SelectOption[] = Array.isArray(options)
            ? options
            : Object.keys(options).map((index) => ({
                key: index,
                value: index,
                label: options[index],
            }));

        const isEmptyClass = !value ? 'border-gray-200 text-gray-500 italic' : '';

        return (
            <select
                className={clsx("input-base transition-[border-color] duration-300 ease-in-out", isEmptyClass)}
                name={name}
                value={value}
                onChange={onChange} // Call the onChange prop
                ref={ref} // Forward the ref if needed
                {...props}
            >
                {!value && (
                    <option value="" disabled>
                        - {__("Select an option", "simplybook")} -
                    </option>
                )}

                {normalizedOptions.map((option) => (
                    <option key={option.key ? option.key : option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }
);

export default SelectInput;