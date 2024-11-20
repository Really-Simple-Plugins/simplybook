import { Controller } from "react-hook-form";
import TextField from "../Fields/TextField";
import ErrorBoundary from "../../components/Common/ErrorBoundary";
import { memo } from "react";
import { __ } from "@wordpress/i18n";

const fieldComponents = {
  text: TextField,
  api: TextField,
};

const FormField = memo(({ setting, control, ...props }) => {
  if (setting.visible === false) {
    return <input type="hidden" defaultValue={setting.value || setting.default} />;
  }

  const FieldComponent = fieldComponents[setting.type];

  if (!FieldComponent) {
    return <div className="w-full">Unknown field type: {setting.type} {setting.id}</div>;
  }

  const validationRules = {
    ...(setting.required && {
      required: {
        value: true,
        message: setting.requiredMessage || __("This field is required", "simplybook"),
      }
    }),
    ...(setting.validation?.regex && {
      pattern: {
        value: new RegExp(setting.validation.regex),
        message: setting.validation.message || __("Invalid format", "simplybook"),
      }
    }),
    ...(setting.min && { min: setting.min }),
    ...(setting.max && { max: setting.max }),
    ...(setting.minLength && { minLength: setting.minLength }),
    ...(setting.maxLength && { maxLength: setting.maxLength }),
    ...(setting.validate && { validate: setting.validate }),
  };

  return (
    <ErrorBoundary>
      <Controller
        name={setting.id}
        control={control}
        rules={validationRules}
        defaultValue={setting.value || setting.default}
        render={({ field, fieldState }) => (
          <FieldComponent
            field={field}
            fieldState={fieldState}
            required={setting.required}
            label={setting.label || setting.id}
            disabled={props.settingsIsUpdating || setting.disabled}
            context={setting.context}
            help={setting.help}
            options={setting.options}
            {...props}
          />
        )}
      />
    </ErrorBoundary>
  );
});

FormField.displayName = 'FormField';

export default FormField;
