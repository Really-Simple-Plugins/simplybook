import { createLazyFileRoute } from "@tanstack/react-router";
import useSettingsData from "../../hooks/useSettingsData";
import { useForm } from "react-hook-form";
import useSettingsMenu from "../../hooks/useSettingsMenu";
import FormFooter from "../../components/Forms/FormFooter";
import { useEffect, useMemo, useRef, useState } from "react";
import { __ } from "@wordpress/i18n";
import SettingsGroupBlock from "../../components/Settings/SettingsGroupBlock";
import { useBlocker } from "@tanstack/react-router";
import ToastNotice from "../../components/Errors/ToastNotice";

const useSettingsLoader = (settingsId) => {
    const menuData = window.simplybook?.settings_menu || [];
    const settingsData = menuData.find((item) => item.id === settingsId);

    if (!settingsData) {
        throw new Error("Settings not found");
    }
    return { settingsData };
};

// Route Definition
export const Route = createLazyFileRoute("/settings/$settingsId")({
    loader: ({ params }) => useSettingsLoader(params.settingsId),
    component: Settings,
});

// Settings Component
function Settings() {
    const { settingsId } = Route.useParams();
    const { settings, saveSettings } = useSettingsData();
    const { currentForm } = useSettingsMenu();
    const toastNotice = new ToastNotice();
    const settingsFormRef = useRef();
    const [settingsFormHeight, setSettingsFormHeight] = useState();

    const currentFormFields = useMemo(
        () => settings.filter((setting) => setting.menu_id === settingsId),
        [settings, settingsId],
    );

    const currentFormValues = useMemo(
        () => extractFormValuesPerMenuId(settings, settingsId),
        [settings, settingsId],
    );

    const lastGroup = useMemo(
        () => currentForm.groups[currentForm.groups.length - 1],
        [currentForm.groups],
    );

    const formHasSettings = (currentForm.has_settings ?? true);

    // Initialize useForm with default values from the fetched settings data
    const {
        handleSubmit,
        control,
        reset,
        formState: { isDirty },
        getValues,
    } = useForm({
        defaultValues: currentFormValues,
    });

    // Reset the form values when the settingsId changes. This fixes the issue
    // that form values still contain data from a different settings tab.
    useEffect(() => {
        reset(currentFormValues);
    }, [settingsId, currentFormValues, reset]);

    /**
     * This useEffect sets up a ResizeObserver to monitor changes in the
     * height of the settings form. It updates the `settingsFormHeight` state
     * only on changes in height, preventing re-renders on width changes.
     * This is used to trigger the visibility of the scroll progress line in the
     * {@see FormScrollProgressLine.jsx} component
     */
    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const heightChanged = entry.contentRect.height !== settingsFormHeight;
                if (heightChanged){
                    setSettingsFormHeight(entry.contentRect.height);
                }
            }
        });
        observer.observe(settingsFormRef.current);
    }, []);

    useBlocker({
        enableBeforeUnload: isDirty,
        shouldBlockFn: () => {
            if (!isDirty) {
                return false; // Dont block
            }

            const shouldLeave = window.confirm(
                __('You have unsaved changes. Are you sure you want to leave?\n\nYour changes will be lost.', 'simplybook'),
            );

            if (shouldLeave) {
                reset(currentFormValues, {
                    keepDirty: false,
                });
            }

            return !shouldLeave;
        }
    });

    /**
     * Method to call when settings are saved successfully. Pass the formData
     * to reset the form values to the current state of the form. The method
     * also shows a success message using the ToastNotice component.
     */
    const handleSavedSettings = (formData) => {
        reset(formData);
        toastNotice.setMessage(
            __('Settings saved successfully', 'simplybook')
        ).setType("success").render();
    }

    /**
     * Method to handle errors when saving settings. The method checks if
     * the response contains errors and shows them using the ToastNotice
     * component. If the response does not contain errors, it logs the
     * response to the console.
     */
    const handleCaughtErrorInSaveSettings = (response) => {
        const errorList = response?.data?.errors;

        if (!errorList) {
            return console.error('Error saving settings:', response);
        }

        errorList.map((error) => {
            toastNotice.setMessage(
                error.message
            ).setType("error").render();
        });
    }

    return (
        <form className="col-span-12 lg:col-span-6" ref={settingsFormRef}>
            {currentForm.groups?.map((group) => {
                const isLastGroup = lastGroup.id === group.id;
                const currentGroupFields = currentFormFields.filter(
                    (field) => field.group_id === group.id,
                );

                return (
                    <SettingsGroupBlock
                        key={group.id}
                        group={group}
                        currentGroupFields={currentGroupFields}
                        control={control}
                        isLastGroup={isLastGroup}
                        formHasSettings={formHasSettings}
                        getValues={getValues}
                        reset={reset}
                    />
                );
            })}

            {formHasSettings && (
                <>
                    <FormFooter
                        getValues={getValues}
                        onSubmit={handleSubmit((formData) => {
                            saveSettings(formData).then(() => {
                                return handleSavedSettings(formData);
                            }).catch((response) => {
                                return handleCaughtErrorInSaveSettings(response);
                            });
                        })}
                        control={control}
                        settingsFormHeight={settingsFormHeight}
                    />
                </>
            )}
        </form>
    );
}

/**
 * Extract form values for the current menu ID from the settings data. For
 * example, if the menu ID is "design", it will extract all settings with
 * menu_id === "design" and adds the key->value to the formValues object.
 */
const extractFormValuesPerMenuId = (settings, menuId) => {
    // Extract default values from settings data where menu_id ===  settingsId
    const formValues = {};

    settings.forEach((setting) => {

        if (setting.menu_id === menuId) {

            // If the setting has sub_settings, merge them into formValues
            if (setting?.sub_settings) {
                Object.entries(setting.sub_settings).forEach(([key, sub_setting]) => {

                    if (!formValues[setting.id]) {
                        formValues[setting.id] = {};
                    }

                    let defaultValue = (sub_setting['default'] ?? '');
                    formValues[setting.id][key] = (sub_setting['value'] ?? defaultValue);

                });
            } else {
                let defaultValue = (setting['default'] ?? '');
                formValues[setting.id] = (setting['value'] ?? defaultValue);
            }
        }
    });

    return formValues;
};