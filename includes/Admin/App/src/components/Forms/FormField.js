import { Controller } from "react-hook-form";
import TextField from "../Fields/TextField";
import HiddenField from "../Fields/HiddenField";
import CheckboxField from "../Fields/CheckboxField";
import SelectField from "../Fields/SelectField";
import ErrorBoundary from "../../components/Common/ErrorBoundary";
import {memo, useEffect} from "react";
import { __ } from "@wordpress/i18n";
import ColorPickerField from "../Fields/ColorPickerField";
import ImplementationField from "../Fields/ImplementationField";
import useSettingsData from "../../hooks/useSettingsData";

const fieldComponents = {
  text: TextField,
  api: TextField,
  hidden: HiddenField,
  checkbox: CheckboxField,
  select: SelectField,
  colorpicker: ColorPickerField,
  implementation: ImplementationField,
};

const FormField = memo(({ setting, control, ...props } ) => {
  if (setting.visible === false) {
    return (
      <input type="hidden" defaultValue={setting.value || setting.default} />
    );
  }
  const FieldComponent = fieldComponents[setting.type];
  const { saveSettings, setValue, getValue, settings } = useSettingsData();
  if (!FieldComponent) {
    return (
      <div className="w-full">
        Unknown field type: {setting.type} {setting.id}
      </div>
    );
  }
  const validationRules = {
    ...(setting.required && {
      validate: {
        required: (value) =>
            !!value || __("This field is required", "simplybook"), // This works for both checkboxes and non-checkboxes
      },
    }),
    ...(setting.validation?.regex && {
      pattern: {
        value: new RegExp(setting.validation.regex),
        message:
          setting.validation.message || __("Invalid format", "simplybook"),
      },
    }),
    ...(setting.min && { min: setting.min }),
    ...(setting.max && { max: setting.max }),
    ...(setting.minLength && { minLength: setting.minLength }),
    ...(setting.maxLength && { maxLength: setting.maxLength }),
    ...(setting.validate && { validate: setting.validate }),
  };

  const handleSaveOnChange = async (fieldValue) => {
    setValue(setting.id, fieldValue);
    if (setting.mapping){
      //mapping is an array of id's, [id1, id2, id3]
      //loop through the mapping array, and for each id, update it with the same value
        setting.mapping.forEach((id) => {
            setValue(id, fieldValue);
        });
    }
    await saveSettings(settings);
  };

  let defaultValue = setting.value || setting.default;
  if (setting.type === "checkbox") {
      defaultValue = defaultValue === "1";
  }
  return (
    <ErrorBoundary>
      <Controller
          name={setting.id}
          control={control}
          rules={validationRules}
          defaultValue={defaultValue}
          render={({ field, fieldState }) => {
            useEffect(() => {
              let curValue = getValue(setting.id);
              if ( curValue === field.value ) {
                return;
              }

              //save on change currently only in use in the wizard, so we can prevent saving of empty values
              //which would not be ideal in the settings pages.
              if (setting.save_on_change && field.value.length>0 ) {
                handleSaveOnChange(field.value);
              }
            }, [field.value]);

            return (
                <FieldComponent
                    className={setting.inline_group ? "inline-flex" : ""}
                    setting={setting}
                    fieldState={fieldState}
                    required={setting.required}
                    label={setting.label}
                    disabled={props.settingsIsUpdating || setting.disabled}
                    context={setting.context}
                    help={setting.help}
                    options={setting.options}
                    {...props}
                    {...field}
                />
            );
          }}
      />
    </ErrorBoundary>
  );
});

FormField.displayName = "FormField";

export default FormField;
