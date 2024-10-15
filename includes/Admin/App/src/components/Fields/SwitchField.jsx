import InputField from '../Forms/InputField';
import SwitchInput from '../Inputs/SwitchInput';

/**
 * TextField component
 * @param {string} label
 * @param {string} value
 * @param {function} onChange
 * @param {object} props
 * @return {JSX.Element}
 * @constructor
 */
const SwitchField = ({ label, value, onChange, ...props }) => {

  return (
      <InputField label={label} reverseLabel={true}>
        <SwitchInput value={value} onChange={onChange} {...props} />
      </InputField>
  );
}
export default SwitchField;