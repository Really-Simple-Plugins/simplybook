import { SelectOption } from "./SelectOption";

export interface SelectInputProps {
    name: string;
    value: string;
    fieldState: any;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Update the type
    options?: SelectOption[];
}