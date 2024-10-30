import * as Label from "@radix-ui/react-label";

/**
 * FieldWrapper component
 * @param {string} label
 * @param {string} context
 * @param {string} help
 * @param {string} error
 * @param {boolean} reverseLabel
 * @param {string} className
 * @param {string} inputId
 * @param {JSX.Element} children
 */
const FieldWrapper = ({
  label,
  context,
  help,
  error,
  reverseLabel = false,
  className ='',
  inputId,
  children,
}) => {
  const colReverse = reverseLabel ? "flex-col-reverse" : "";

  return (
      <div className={`flex flex-col w-full ${className} pt-4`}>
        <div className={`flex w-full flex-col ${colReverse}`}>
          <Label.Root
              className="font-medium text-gray-700 cursor-pointer pb-1"
              htmlFor={inputId} // Associate the label with the input ID
          >
            {label}
          </Label.Root>
          {help && (
              <p className="text-xs font-light text-gray-600 pb-1">{help}</p> // Placeholder for the help component
          )}
          {children}
        </div>
        {error && (
            <p className="w-full text-xs pb-1font-light text-red-600">{error}</p>
        )}
        {context && (
            <p className="w-full pb-1 text-xs font-light text-gray-600">{context}</p>
        )}
      </div>
  );
};

export default FieldWrapper;
