import TextField from '../Fields/TextField';
import SwitchField from '../Fields/SwitchField';
import EmailField from '../Fields/EmailField';
import ErrorBoundary from '../../components/Common/ErrorBoundary';

const fieldComponents = {
  text: TextField,
  switch: SwitchField,
  email: EmailField,
};

const FormField = ({ setting, ...props }) => {
  if (setting.visible === false) {
    return <input type="hidden" value={setting.value || setting.default} />;
  }

  const FieldComponent = fieldComponents[setting.type];

  if (!FieldComponent) {
    return <div>Unknown field type: {setting.type}</div>;
  }

  return (
      <ErrorBoundary>
        <FieldComponent
            {...props}
            label={setting.label}
            disabled={props.settingsIsUpdating || setting.disabled}
            key={setting.id}
            defaultValue={setting.value || setting.default}
            options={setting.options}  // For fields like select, radio, etc.
        />
      </ErrorBoundary>
  );
};

export default FormField;
