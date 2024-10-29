import TextInput from '../Inputs/TextInput';
import FieldWrapper from '../Forms/FieldWrapper';

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
      <FieldWrapper label={label}>
        <TextInput type={'email'} value={value} onChange={onChange} {...props} />
      </FieldWrapper>
  );
}
export default EmailField;