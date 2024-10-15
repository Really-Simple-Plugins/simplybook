import TextInput from '../Inputs/TextInput';
import InputField from '../Forms/InputField';

/**
 * TextField component
 * @param {string} label
 * @param {string} value
 * @param {function} onChange
 * @param {object} props
 * @return {JSX.Element}
 * @constructor
 */
const EmailField = ({ label, value, onChange, ...props }) => {
  return (
      <InputField label={label}>
        <TextInput type={'email'} value={value} onChange={onChange} {...props} />
      </InputField>
  );
}
export default EmailField;