import { SelectOption } from "./SelectOption";

export interface SelectInputProps {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Update the type
    options?: SelectOption[];
}