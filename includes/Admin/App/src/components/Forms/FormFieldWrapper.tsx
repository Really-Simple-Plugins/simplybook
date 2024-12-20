import { memo } from "react";
import FormField from "./FormField";

type Field = {
    id: string;
    name: string;
    group_inline?: string;
    [key: string]: any; // Additional properties if required
};

type FormFieldWrapperProps = {
    fields: Field[];
    control: any; // Replace `any` with the specific type from react-hook-form if available
};

const FormFieldWrapper = memo(({ fields, control }: FormFieldWrapperProps) => {
    // Group fields by `group_inline`
    const groupedFields = fields.reduce<Record<string, Field[]>>((groups, field) => {
        if (field.group_inline) {
            groups[field.group_inline] = groups[field.group_inline] || [];
            groups[field.group_inline].push(field);
        }
        return groups;
    }, {});

    return (
        <>
            {/* Fields without group_inline */}
            {fields
                .filter((field) => !field.group_inline)
                .map((field) => (
                    <FormField setting={field} key={field.id} control={control} />
                ))}

            {/* Grouped fields */}
            {Object.entries(groupedFields).map(([groupKey, fields]) => (
                <div className="flex-row" key={groupKey}>
                    {fields.map((field) => (
                        <FormField setting={field} key={field.id} control={control} />
                    ))}
                </div>
            ))}
        </>
    );
});

FormFieldWrapper.displayName = "FormFieldWrapper";

export default FormFieldWrapper;
