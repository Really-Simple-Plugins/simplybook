const InputTextArea = ({ value, onChange, onError }) => {
  return (
      <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onError={onError}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          rows={4}
      />
  );
};

export default InputTextArea;
