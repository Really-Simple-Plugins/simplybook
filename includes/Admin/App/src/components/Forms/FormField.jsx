import { Controller } from "react-hook-form";
import TextField from "../Fields/TextField";
import ErrorBoundary from "../../components/Common/ErrorBoundary";
import { memo } from "react";

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

  return (
    <ErrorBoundary>
      <Controller
        name={setting.id} // Use setting.id as the name
        control={control}
        rules={setting.validation}
        defaultValue={setting.value || setting.default}
        render={({ field, fieldState }) => (
          <FieldComponent
            field={field}
            fieldState={fieldState}
            label={setting.label || setting.id}
            disabled={props.settingsIsUpdating || setting.disabled}
            options={setting.options}
            {...props}
          />
        )}
      />
    </ErrorBoundary>
  );
});

export default FormField;
