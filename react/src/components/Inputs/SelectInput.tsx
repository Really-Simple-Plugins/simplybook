import React from "react";
import * as Select from "@radix-ui/react-select";
import Icon from "../Common/Icon";

interface SelectOption {
    key: string;
    value: string;
    label: string;
}

interface SelectOptionsObject {
    [key: string]: string;
}

interface SelectInputProps {
    name: string;
    setting: { value: string };
    value: string;
    onChange: (value: string) => void;
    options?: SelectOption[] | SelectOptionsObject;
}

/**
 * Styled select input component
 * @param props - Props for the select component
 * @returns {JSX.Element} The rendered select component
 *
 * @todo: tailwind css classes don't seem to work, added inline styles until this is figured out.
 */
const SelectInput = React.forwardRef<HTMLButtonElement, SelectInputProps>(
    ({ name, value, onChange, options = [], setting }, ref) => {
        // Normalize options if it's an object
        const normalizedOptions: SelectOption[] = Array.isArray(options)
            ? options
            : Object.keys(options).map((index) => ({
                key: index,
                value: index,
                label: options[index],
            }));

            console.log(normalizedOptions);

        return (
        <select className="input-base" name={name} value={value} onChange={(e) => onChange}>
            {normalizedOptions.map((option) => (
                <option key={option.key} value={option.value}>{option.label}</option>
            ))}
        </select>
            // <Select.Root value={value} onValueChange={onChange}>
            //     <Select.Trigger
            //         ref={ref}
            //         className="input flex w-full items-center justify-between rounded-md border border-gray-300 p-2 focus:border-tertiary focus:outline-hidden focus:ring"
            //     >
            //         <Select.Value placeholder="Select an option…" />
            //         <Select.Icon className="ml-2">
            //             <Icon name="chevron-down" />
            //         </Select.Icon>
            //     </Select.Trigger>
            //     <Select.Portal>
            //         <Select.Content
            //             position="popper"
            //             style={{
            //                 width: "100%",
            //                 borderRadius: "0.375rem",
            //                 borderWidth: "1px",
            //                 borderColor: "#D1D5DB",
            //                 backgroundColor: "white",
            //                 zIndex: 50,
            //                 boxShadow:
            //                     "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            //                 transitionProperty: "all",
            //                 transitionTimingFunction: "ease-in-out",
            //                 transitionDuration: "200ms",
            //             }}
            //             className="rounded-md border border-gray-300 bg-white z-50 shadow-lg transition ease-in-out duration-200"
            //         >
            //             <Select.ScrollUpButton
            //                 className="flex items-center justify-center p-2"
            //                 style={{
            //                     display: "flex",
            //                     alignItems: "center",
            //                     justifyContent: "center",
            //                     margin: "0.5rem",
            //                 }}
            //             >
            //                 <Icon name="chevron-up" />
            //             </Select.ScrollUpButton>
            //             <Select.Viewport>
            //                 <Select.Group>
            //                 {normalizedOptions.map((option) => (
            //                     <SelectItem 
            //                         className="text-base"
            //                         key={option.value} value={option.value}>
            //                         {option.label}
            //                     </SelectItem>
            //                     // <Select.Item
            //                     //     className="w-full overflow-hidden text-base"
            //                     //     key={option.value} value={option.value}>
            //                     //     <Select.ItemText>{option.label}</Select.ItemText>
            //                     //     <Select.ItemIndicator className="ml-2">
            //                     //     <Icon name="check" />
            //                     //     </Select.ItemIndicator>
            //                     // </Select.Item>
            //                 ))}
            //                 </Select.Group>
            //             </Select.Viewport>
            //             <Select.ScrollDownButton
            //                 className="flex items-center justify-center p-2"
            //                 style={{
            //                     display: "flex",
            //                     alignItems: "center",
            //                     justifyContent: "center",
            //                     margin: "0.5rem",
            //                 }}
            //             >
            //                 <Icon name="chevron-down" />
            //             </Select.ScrollDownButton>
            //         </Select.Content>
            //     </Select.Portal>
            // </Select.Root>
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
