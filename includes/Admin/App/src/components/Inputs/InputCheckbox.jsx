const InputCheckbox = ({ value, onChange, onError }) => {
  return (
      <label className="flex items-center space-x-2">
        <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            onError={onError}
            className="form-checkbox text-blue-500"
        />
        <span>Checkbox</span>
      </label>
  );
};

export default InputCheckbox;
