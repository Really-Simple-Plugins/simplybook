import FormScrollProgressLine from "./FormScrollProgressLine";
import ButtonInput from "../Inputs/ButtonInput";
import { __ } from "@wordpress/i18n";
import { useFormState } from "react-hook-form";
import Icon from "../Common/Icon";
import useSettingsData from "../../hooks/useSettingsData";
import ButtonLink from "../Buttons/ButtonLink";
import PreviewButtonInput from "../Inputs/PreviewButton";
import {ToastContainer} from "react-toastify";
import { useParams } from "@tanstack/react-router";

const FormFooter = ({
    onSubmit,
    control,
    getValues,
    
    crudContext = null,
    showSettingsButtons = true
}) => {
    const settingsFormState = control ? useFormState({ control }) : {};
    const {
        isDirty = false,
        isSubmitting = false,
        isValidating = false,
        isValid = true
    } = settingsFormState;

    const { isSavingSettings } = useSettingsData();
    const params = useParams({ from: '/settings/$settingsId' });
    
    // Check if we're on providers or services pages
    const isProvidersOrServicesPage = params?.settingsId === 'providers' || params?.settingsId === 'services';

    // Determine active context
    const isCrudMode = crudContext !== null;
    const showSettings = showSettingsButtons && !isCrudMode;
    const showCrud = isCrudMode;

    // Settings form states
    const settingsStates = [
        { condition: isSubmitting, message: __("Saving...", "simplybook"), color: "blue" },
        { condition: isValidating, message: __("Validating...", "simplybook"), color: "blue" },
        { condition: !isValid, message: __("Form contains errors", "simplybook"), color: "red" },
        { condition: isDirty, message: __("You have unsaved changes", "simplybook"), color: "amber" },
    ];

    const crudStates = [
        { condition: crudContext?.isLoading, message: __("Saving...", "simplybook"), color: "blue" },
        { condition: crudContext?.hasUnsavedChanges, message: __("You have unsaved changes", "simplybook"), color: "amber" },
    ];

    const currentState = showSettings 
        ? settingsStates.find(state => state.condition)
        : crudStates.find(state => state.condition);
    return (
        <div className="sticky bottom-0 start-0 z-10 rounded-b-md bg-gray-50 shadow-md">
            <FormScrollProgressLine />
            <div className="flex flex-row justify-end gap-2 items-center p-5 mr-2">
                {currentState && (
                    <p className={`text-sm text-${currentState.color}-500 flex items-center gap-2 p-0 m-0 mr-2`}>
                        {currentState.message}
                    </p>
                )}
                
                {/* Settings context buttons */}
                {showSettings && (
                    <>
                        {!isProvidersOrServicesPage && (
                            <PreviewButtonInput
                                btnVariant={'tertiary-small'}
                                getValues={getValues}>
                            </PreviewButtonInput>
                        )}
                        <ButtonLink
                            disabled={!isDirty || isSubmitting || isValidating || isSavingSettings}
                            btnVariant={'secondary-small'}
                            onClick={onSubmit}
                        >
                            {__("Save", "simplybook")}
                        </ButtonLink>
                    </>
                )}
                
                {/* CRUD context buttons */}
                {showCrud && (
                    <>
                        <ButtonLink
                            btnVariant={'tertiary-small'}
                            onClick={crudContext.onCancel}
                            disabled={crudContext.isLoading}
                        >
                            {__("Cancel", "simplybook")}
                        </ButtonLink>
                        <ButtonLink
                            btnVariant={'secondary-small'}
                            onClick={crudContext.onSave}
                            disabled={crudContext.isLoading}
                        >
                            {crudContext.isLoading 
                                ? __("Saving...", "simplybook") 
                                : __("Save", "simplybook")}
                        </ButtonLink>
                    </>
                )}
            </div>

            <ToastContainer
                toastClassName={"rounded-xl"}
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
        </div>
    );
}

FormFooter.displayName = "FormFooter";

export default FormFooter;