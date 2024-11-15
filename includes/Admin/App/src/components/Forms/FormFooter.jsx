import FormScrollProgressLine from "./FormScrollProgressLine";
import ButtonInput from "../Inputs/ButtonInput";
import { __ } from "@wordpress/i18n";
import { useFormState } from "react-hook-form";
function FormFooter({ onSubmit, control }) {
  const { isDirty, isSubmitting, isValidating, isValid, dirtyFields } =
    useFormState({
      control,
    });

  return (
    <div className="sticky z-10 rounded-b-md bg-gray-50 shadow-md">
      <FormScrollProgressLine />
      <div className="flex flex-row justify-end p-5">
        {isDirty && <p>{__("You have unsaved changes", "simplybook")}</p>}
        {isSubmitting && <p>{__("Saving...", "simplybook")}</p>}
        <ButtonInput onClick={onSubmit} disabled={isSubmitting}>
          {__("Save", "simplybook")}
        </ButtonInput>
      </div>
      dirtyFields: {JSON.stringify(dirtyFields)}
    </div>
  );
}
export default FormFooter;
