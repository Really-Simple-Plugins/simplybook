import FormScrollProgressLine from "./FormScrollProgressLine";
import { __ } from "@wordpress/i18n";
import { useFormState } from "react-hook-form";
import useSettingsData from "../../hooks/useSettingsData";
import ButtonLink from "../Buttons/ButtonLink";
import PreviewButtonInput from "../Inputs/PreviewButton";
import { ToastContainer } from "react-toastify";
import { useParams } from "@tanstack/react-router";
import { useCrudContext } from "../../context/CrudContext";
import { useEffect, useState } from "react";

const FormFooter = ({
    onSubmit,
    control,
    getValues,
    settingsFormHeight,
}) => {
    const settingsFormState = control ? useFormState({ control }) : {};
    const {
        isDirty = false,
        isSubmitting = false,
        isValidating = false,
        isValid = true,
    } = settingsFormState;
    const { crudState, dispatch, saveItems } = useCrudContext();
    const { isSavingSettings } = useSettingsData();
    const params = useParams({ from: '/settings/$settingsId' });
    const [savingAllowed, setSavingAllowed] = useState(false);
    const [cancelAllowed, setCancelAllowed] = useState(false);

    useEffect(() => {
        const providersAllowedToSave = (!crudState.isSaving && crudState.providersHasUnsavedChanges && !Object.keys(crudState.providerErrors).length > 0);
        const servicesAllowedToSave = (!crudState.isSaving && crudState.servicesHasUnsavedChanges && !Object.keys(crudState.serviceErrors).length > 0);
        switch (crudState.itemType) {
            case "provider": {
                setSavingAllowed(providersAllowedToSave);
                setCancelAllowed(!crudState.isSaving && crudState.providersHasUnsavedChanges);
                break;
            }
            case "service": {
                setSavingAllowed(servicesAllowedToSave);
                setCancelAllowed(!crudState.isSaving && crudState.servicesHasUnsavedChanges);
                break;
            }
        }
    }, [crudState]);

    const handleSaveItems = () => {
        dispatch({ dispatchType: 'savingChanged', change: { isSaving: true } });
        saveItems();
    };

    useEffect(() => {
        switch (params?.settingsId) {
            case 'providers': {
                dispatch({ dispatchType: "crudItemTypeChanged", change: { itemType: 'provider' } });
                break;
            }
            case 'services': {
                dispatch({ dispatchType: "crudItemTypeChanged", change: { itemType: 'service' } });
                break;
            }
            default: {
                dispatch({ dispatchType: "crudItemTypeChanged", change: { itemType: null } });
            }
        }
    }, [params]);

    // Form states for Design page
    const settingsStates = [
        { condition: isSubmitting, message: __("Saving...", "simplybook") },
        { condition: isValidating, message: __("Validating...", "simplybook") },
        { condition: !isValid, message: __("Form contains errors", "simplybook") },
        { condition: isDirty, message: __("You have unsaved changes", "simplybook") },
    ];

    // Form states for Provider and Service pages
    const crudStates = [
        { condition: crudState.generalError, message: crudState.generalError },
        { condition: crudState.isSaving, message: __("Saving...", "simplybook") },
        { condition: cancelAllowed, message: __("You have unsaved changes", "simplybook") },
    ];

    const currentState = !crudState.itemType
        ? settingsStates.find(state => state.condition)
        : crudStates.find(state => state.condition);

    return (
        <div className="sticky bottom-0 start-0 z-10 rounded-b-md bg-gray-50 shadow-md">
            <FormScrollProgressLine settingsFormHeight={settingsFormHeight}/>
            <div className="flex flex-row justify-end gap-2 items-center p-5 mr-2">
                {currentState && (
                    <p className={`text-sm flex items-center gap-2 p-0 m-0 mr-2 ${crudState.generalError && 'text-red-600'}`}>
                        {currentState.message}
                    </p>
                )}

                {/* Settings context buttons */}
                {!crudState.itemType && (
                    <>
                        <PreviewButtonInput
                            btnVariant={'tertiary-small'}
                            getValues={getValues}>
                        </PreviewButtonInput>
                        <ButtonLink
                            disabled={!isDirty || isSubmitting || isValidating || isSavingSettings}
                            btnVariant={'secondary-small'}
                            onClick={onSubmit}
                        >
                            {isSubmitting
                                ? __("Saving...", "simplybook")
                                : __("Save", "simplybook")}
                        </ButtonLink>
                    </>
                )}

                {/* CRUD context buttons */}
                {crudState.itemType && (
                    <>
                        <ButtonLink
                            btnVariant={'tertiary-small'}
                            onClick={() => dispatch({ dispatchType: 'cancelAllUnsavedChanges' })}
                            disabled={!cancelAllowed}
                        >
                            {__("Cancel", "simplybook")}
                        </ButtonLink>
                        <ButtonLink
                            btnVariant={'secondary-small'}
                            onClick={() => handleSaveItems()}
                            disabled={!savingAllowed}
                        >
                            {__("Save", "simplybook")}
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
};

FormFooter.displayName = "FormFooter";

export default FormFooter;