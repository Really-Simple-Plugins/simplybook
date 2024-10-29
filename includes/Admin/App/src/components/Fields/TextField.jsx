import TextInput from '../Inputs/TextInput';
import FieldWrapper from '../Forms/FieldWrapper';

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
      <FieldWrapper label={label} className={className}>
        <TextInput type={'text'} value={value} onChange={onChange} {...props} />
      </FieldWrapper>
  );
}
export default TextField;