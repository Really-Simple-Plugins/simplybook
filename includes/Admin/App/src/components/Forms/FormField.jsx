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
    return <input type="hidden" value={setting.value || setting.default} />;
  }

  const FieldComponent = fieldComponents[setting.type];

  if (!FieldComponent) {
    return (
      <div className={"w-full"}>
        Unknown field type: {setting.type} {setting.id}
      </div>
    );
  }

  // rules	Object		Validation rules in the same format for register options, which includes:

  // only set what is available and set: required, min, max, minLength, maxLength, pattern, validate
  const validationRules = {};
  if (setting.required) {
    validationRules.required = {
      value: true,
      message:
        setting.requiredMessage || __("This field is required", "simplybook"),
    };
  }
  if (setting.validation?.regex) {
    validationRules.pattern = {
      value: new RegExp(setting.validation.regex),
      message: setting.validation.message || __("Invalid format", "simplybook"),
    };
  }
  if (setting.min) {
    validationRules.min = setting.min;
  }
  if (setting.max) {
    validationRules.max = setting.max;
  }
  if (setting.minLength) {
    validationRules.minLength = setting.minLength;
  }
  if (setting.maxLength) {
    validationRules.maxLength = setting.maxLength;
  }
  if (setting.validate) {
    validationRules.validate = setting.validate;
  }

  return (
    <ErrorBoundary>
      <Controller
        name={setting.id} // Use setting.id as the name
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

export default FormField;
