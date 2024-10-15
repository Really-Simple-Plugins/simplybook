const TextInput = ({ type="text", value, onChange, onError }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onError={onError}
      className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring"
    />
  );
};

export default TextInput;
