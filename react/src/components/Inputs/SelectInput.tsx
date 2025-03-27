import React from "react";
import * as Select from "@radix-ui/react-select";
import Icon from "../Common/Icon";
import { SelectOption } from "../../types/inputs/SelectOption";
import { SelectInputProps } from "../../types/inputs/SelectInputProps";

/**
 * Styled select input component
 * @param props - Props for the select component
 * @returns {JSX.Element} The rendered select component
 */
const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
    ({ name, value, onChange, options = [], ...props }, ref) => {
        // Normalize options if it's an object
        const normalizedOptions: SelectOption[] = Array.isArray(options)
            ? options
            : Object.keys(options).map((index) => ({
                key: index,
                value: index,
                label: options[index],
            }));

        return (
            <select
                className="input-base"
                name={name}
                value={value}
                onChange={onChange} // Call the onChange prop
                ref={ref} // Forward the ref if needed
                {...props}
            >
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

interface SelectItemProps
    extends React.ComponentPropsWithoutRef<typeof Select.Item> {
    children: React.ReactNode;
    className?: string;
}

/**
 * Styled select item component
 * @param props - Props for the select item component
 * @returns {JSX.Element} The rendered select item component
 */
const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <Select.Item
                ref={ref}
                className={`flex cursor-pointer items-center justify-between bg-white shadow-lg rounded-md p-2 hover:bg-gray-100 focus:bg-gray-200 ${className}`}
                style={{
                    display: "flex",
                    cursor: "pointer",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    borderRadius: "0.375rem",
                    padding: "0.5rem",
                    width: "100%",
                }}
                {...props}
            >
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className="ml-2">
                    <Icon name="check" />
                </Select.ItemIndicator>
            </Select.Item>
        );
    }
);

export { SelectItem };
