import React from "react";
import FormField from "./FormField";

/**
 * The form field wrapper component is created to allow some fields to be grouped, and to be displayed in a row.
 * @param fields
 * @param control
 * @param getValues
 * @returns {Element}
 * @constructor
 */
const FormFieldWrapper = ({ fields, control, getValues }) => {
    // Group fields by `inline_group`
    const groupedFields = fields.reduce((groups, field) => {
        if (field.inline_group) {
            groups[field.inline_group] = groups[field.inline_group] || [];
            groups[field.inline_group].push(field);
        }
        return groups;
    }, {})

    return (
        <>
            {/* Fields without inline_group */}
            {fields
                .filter((field) => !field.inline_group)
                .map((field) => (
                    <FormField setting={field} key={field.id} control={control} />
                ))}

            {/* Grouped fields */}
            {Object.entries(groupedFields).map(([groupKey, fields]) => (
                <div className="flex flex-row" key={groupKey}>
                    {fields.map((field) => (
                        <FormField setting={field} key={field.id} control={control} />
                    ))}
                </div>
            ))}
        </>
    );
};

export default FormFieldWrapper;