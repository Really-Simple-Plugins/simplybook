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

    return (
        <>
            {/* Fields without wrapper_id */}
            {fields.map((field) => (
                <FormField className={field?.style == 'inline' ? 'form-field-inline' : 'w-full'} setting={field} key={field.id} control={control} />
            ))}
        </>
    );
};

export default FormFieldWrapper;