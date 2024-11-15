import React from "react";
import * as Switch from "@radix-ui/react-switch";

interface SwitchInputProps {
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Styled switch input component
 * @param props - Props for the switch component
 * @returns {JSX.Element} The rendered switch component
 */
const SwitchInput = React.forwardRef<HTMLButtonElement, SwitchInputProps>(
  ({ value, onChange }, ref) => {
    return (
      <Switch.Root
        ref={ref}
        checked={value}
        onChange={(e) => onChange(e)}
        className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200"
      >
        <Switch.Thumb className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
      </Switch.Root>
    );
  },
);

SwitchInput.displayName = "SwitchInput"; // Add a displayName for better debugging

export default SwitchInput;
