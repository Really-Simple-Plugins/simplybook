import React, {forwardRef, InputHTMLAttributes, useEffect, useState} from "react";

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Styled text input component
 * @param props - Props for the input component
 * @returns {JSX.Element} The rendered input element
 */
const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ type = "checkbox", className, value, onChange, ...props }, ref) => {
      const [isChecked, setChecked] = useState(false);
      useEffect(() => {
            setChecked(value === '1' || value === 1);
      }, [value]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (onChange) {
              setChecked(e.target.checked);
          }
      };

      return (
      <input
        checked={isChecked}
        ref={ref}
        onChange={handleChange}
        type={type}
        className={`rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 ${className || ""}`}
        {...props}
      />
    );
  },
);

CheckboxInput.displayName = "CheckboxInput";

export default CheckboxInput;
