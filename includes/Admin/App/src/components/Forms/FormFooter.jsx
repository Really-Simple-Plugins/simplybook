import FormScrollProgressLine from './FormScrollProgressLine';
import ButtonInput from '../Inputs/ButtonInput';
import { __ } from '@wordpress/i18n';
import useSettingsData from '../../hooks/useSettingsData';
import {useFormState} from 'react-hook-form';
function FormFooter({ onSubmit, control }) {
  const { isDirty, isSubmitting, isValidating, isValid, dirtyFields } = useFormState({
    control
  });
  console.log('FormFooter', isDirty, isSubmitting, isValidating, isValid, dirtyFields);

  return (
      <div className="sticky bg-gray-50 shadow-md rounded-b-md z-10">
        <FormScrollProgressLine />
        <div className="flex flex-row p-5 justify-end">
          {isDirty && <p>{__('You have unsaved changes', 'simplybook')}</p>}
          {isSubmitting && <p>{__('Saving...', 'simplybook')}</p>}
          <ButtonInput onClick={onSubmit} disabled={isSubmitting}>
            {__('Save', 'simplybook')}
          </ButtonInput>
        </div>
        dirtyFields: {JSON.stringify(dirtyFields)}
      </div>
  );
}
export default FormFooter;