import { createLazyFileRoute } from "@tanstack/react-router";
import useSettingsData from "../../hooks/useSettingsData";
import { useForm } from "react-hook-form";
import useSettingsMenu from "../../hooks/useSettingsMenu";
import FormFooter from "../../components/Forms/FormFooter";
import {useMemo} from "react";
import { __ } from "@wordpress/i18n";
import SettingsGroupBlock from "../../components/Settings/SettingsGroupBlock";
import { useBlocker } from "@tanstack/react-router";

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

    useBlocker({
        blockerFn: () => window.confirm(__("You have unsaved changes. Are you sure you want to leave?","simplybook")),
        condition: isDirty,
    });

    return (
        <form>
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
                <FormFooter
                    getValues={getValues}
                    onSubmit={handleSubmit((formData) => {
                        saveSettings(formData).then(() => {
                            reset(formData);
                        });
                    })}
                    control={control}
                />
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
            let defaultValue = (setting['default'] ?? '');
            formValues[setting.id] = (setting['value'] ?? defaultValue);
        }
    });

    return formValues;
};