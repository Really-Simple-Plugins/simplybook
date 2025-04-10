import FormScrollProgressLine from "./FormScrollProgressLine";
import ButtonInput from "../Inputs/ButtonInput";
import { __ } from "@wordpress/i18n";
import { useFormState } from "react-hook-form";
import Icon from "../Common/Icon";
import useSettingsData from "../../hooks/useSettingsData";
import ButtonLink from "../Buttons/ButtonLink";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

const FormFooter = ({
    onSubmit, 
    control,
    hasSettings 
}) => {
    const { 
        isDirty,
         isSubmitting,
         isValidating, 
         isValid 
    } = useFormState({
        control,
    });

    const { isSavingSettings } = useSettingsData();

    const formStates = [
        { condition: isSubmitting, message: __("Saving...", "simplybook"), color: "blue" },
        { condition: isValidating, message: __("Validating...", "simplybook"), color: "blue" },
        { condition: !isValid, message: __("Form contains errors", "simplybook"), color: "red" },
        { condition: isDirty, message: __("You have unsaved changes", "simplybook"), color: "amber" },
    ];

    const currentState = formStates.find(state => state.condition);
    return (
        <div className="sticky bottom-0 start-0 z-10 rounded-b-md bg-gray-50 shadow-md">
            <FormScrollProgressLine />
            <div className="flex flex-row justify-end gap-2 items-center p-5">
                {currentState && (
                    <p className={`text-sm text-${currentState.color}-500 flex items-center gap-2`}>
                        {currentState.message}
                    </p>
                )}
                {hasSettings && (
                    <ButtonLink
                        disabled={!isDirty || isSubmitting || isValidating || isSavingSettings}
                        btnVariant={'secondary'}
                        onClick={onSubmit}
                    >    
                        {__("Save", "simplybook")}
                    </ButtonLink>
                )}
            </div>
        </div>
    );
}

FormFooter.displayName = "FormFooter";

export default FormFooter;