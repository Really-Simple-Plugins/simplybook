import FormScrollProgressLine from './FormScrollProgressLine';
import ButtonInput from '../Inputs/ButtonInput';
import { __ } from '@wordpress/i18n';
function FormFooter({ isDirty, onSubmit }) {
  return (
      <div className="sticky bg-gray-50 shadow-md rounded-b-md z-10">
        <FormScrollProgressLine />
        <div className="flex flex-row p-5 justify-end">
          {isDirty && <p>{__('You have unsaved changes', 'simplybook')}</p>}
          <ButtonInput onClick={onSubmit}>
            {__('Save', 'simplybook')}
          </ButtonInput>
        </div>
      </div>
  );
}
export default FormFooter;