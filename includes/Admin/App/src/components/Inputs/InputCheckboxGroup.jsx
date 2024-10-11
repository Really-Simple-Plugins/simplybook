const InputCheckboxGroup = ({ value, onChange, onError, options = [] }) => {
  const handleChange = (optionValue) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
      <div className="flex flex-col space-y-2">
        {options.map((option) => (
            <label key={option.value} className="flex items-center space-x-2">
              <input
                  type="checkbox"
                  checked={value.includes(option.value)}
                  onChange={() => handleChange(option.value)}
                  onError={onError}
                  className="form-checkbox text-blue-500"
              />
              <span>{option.label}</span>
            </label>
        ))}
      </div>
  );
};

export default InputCheckboxGroup;
