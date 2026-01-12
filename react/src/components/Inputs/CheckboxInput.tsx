import React, {forwardRef, InputHTMLAttributes, useEffect, useState} from "react";
import clsx from "clsx";
import DOMPurify from "dompurify";
import FormTooltip from "../Fields/Partials/FormTooltip";

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    tooltip?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Styled text input component
 * @param props - Props for the input component
 * @returns {JSX.Element} The rendered input element
 */
const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
    ({
        label,
        className,
        tooltip,
        value,
        onChange,
        ...props
    }, ref) => {
        // Default is a truthy value. (true, 1, "1", "true")
        // @ts-ignore
        const [checked, setChecked] = useState((value == true));
        // @ts-ignore
        const [valueState, setValueState] = useState((value == true ? 1 : 0));

        const checkBoxClasses = clsx(
            "input-type-checkbox relative w-8 h-5 shrink-0 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600",
            "peer-checked:after:translate-x-[14px] rtl:peer-checked:after:-translate-x-[14px] peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:start-0.5 after:bg-white after:border-gray-200 after:border",
            "after:rounded-full after:aspect-square after:h-3 after:w-3 after:transition-all"
        );

        return (
            <label className="checkbox-field relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                        setValueState((e.target.checked ? 1 : 0));
                        setChecked(e.target.checked);
                        if (onChange) {
                            onChange(e);
                        }
                    }}
                    className="sr-only peer"
                    value={valueState}
                    {...props}
                />
                <div className={clsx(checkBoxClasses, className)}></div>
                {label && (
                    <span
                        className={`ms-2 leading-5 font-medium text-black text-label [&_a]:underline ${className || ""}`}
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(label)}}
                    >
                    </span>
                )}
                {tooltip && (
                    <FormTooltip
                        message={tooltip?.message}
                        type={tooltip?.type}
                    />
                )}
            </label>
        );
    }
);


CheckboxInput.displayName = "CheckboxInput";

export default CheckboxInput;