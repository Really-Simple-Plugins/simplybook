import React from "react";
import * as Select from "@radix-ui/react-select";
import Icon from "../Common/Icon";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectInputProps {
    setting: {value: string};
    value: string;
    onChange: (value: string) => void;
    options?: SelectOption[];
}

/**
 * Styled select input component
 * @param props - Props for the select component
 * @returns {JSX.Element} The rendered select component
 *
 * @todo: tailwind css classes don't seem to work, added inline styles until this is figured out.
 */
const SelectInput = React.forwardRef<HTMLButtonElement, SelectInputProps>(
    ({ value, onChange, options = [], setting, ...props }, ref) => {
        return (
            <Select.Root value={value} onValueChange={(value) => onChange(value)} >
                <Select.Trigger
                    ref={ref}
                    className="flex w-full items-center justify-between rounded-md border border-gray-300 p-2 focus:border-tertiary focus:outline-none focus:ring"
                >
                    <Select.Value placeholder="Select an option…" />
                    <Select.Icon className="ml-2"><Icon name={"chevron-down"} /></Select.Icon>
                </Select.Trigger>
                <Select.Portal >
                    <Select.Content
                        style={{
                            width: '100%', // Full width
                            borderRadius: '0.375rem',
                            borderWidth: '1px',
                            borderColor: '#D1D5DB',
                            backgroundColor: 'white',
                            zIndex: 50,
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                            transitionProperty: 'all',
                            transitionTimingFunction: 'ease-in-out',
                            transitionDuration: '200ms'
                        }}
                        className="rounded-md border border-gray-300 bg-white z-50 shadow-lg transition ease-in-out duration-200">
                        <Select.ScrollUpButton className="flex items-center justify-center p-2"
                                               style={{
                                                   display: 'flex',
                                                   alignItems: 'center',  // Vertically centers the content
                                                   justifyContent: 'center', // Optionally centers horizontally if needed
                                                   margin: '0.5rem',  // Adjust the margin for spacing
                                               }}
                        >
                            <Icon name={"chevron-up"} />
                        </Select.ScrollUpButton>
                        <Select.Viewport className="p-2 bg-white">
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select.Viewport>
                        <Select.ScrollDownButton className="flex items-center justify-center p-2"
                                                 style={{
                                                     display: 'flex',
                                                     alignItems: 'center',  // Vertically centers the content
                                                     justifyContent: 'center', // Optionally centers horizontally if needed
                                                     margin: '0.5rem',  // Adjust the margin for spacing
                                                 }}
                        >
                            <Icon name={"chevron-down"} />
                        </Select.ScrollDownButton>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        );
    },
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
                className={"flex cursor-pointer items-center justify-between bg-white shadow-lg rounded-md p-2 hover:bg-gray-100 focus:bg-gray-200 "+className}
                style={{
                    display: 'flex',
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    borderRadius: '0.375rem',
                    padding: '0.5rem',
                    width: '100%', // Full width
                }}
                {...props}
            >
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className="ml-2"

                >
                    <Icon name="check" /> {/**Indicates a selected item **/}
                </Select.ItemIndicator>
            </Select.Item>
        );
    },
);

export { SelectItem };