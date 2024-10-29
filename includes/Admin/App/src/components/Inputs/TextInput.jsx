/**
 * Styled text input component
 * @param type
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const TextInput = ({ type = "text", ...props }) => {
  return (
      <input
          type={type}
          className="
          w-full rounded-md border border-gray-300 p-2 focus:border-blue-500
          focus:outline-none focus:ring
          disabled:bg-gray-200 disabled:cursor-not-allowed disabled:border-gray-200
          "
          {...props}
      />
  );
};

export default TextInput;