import TextInput from '../Inputs/TextInput';
import InputField from '../Forms/InputField';

/**
 * TextField component
 * @param {string} label
 * @param {string} value
 * @param {function} onChange
 * @param {string} className
 * @param {object} props
 * @return {JSX.Element}
 * @constructor
 */
const TextField = ({ label, value, onChange, className, ...props }) => {
  return (
      <InputField label={label} className={className} {...props}>
        <TextInput type={'text'} value={value} onChange={onChange} {...props} />
      </InputField>
  );
}
export default TextField;