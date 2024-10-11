import * as RadioGroup from "@radix-ui/react-radio-group";

const InputRadioGroup = ({ value, onChange, onError, options = [] }) => {
  return (
      <RadioGroup.Root
          className="flex flex-col space-y-2"
          value={value}
          onValueChange={onChange}
          onError={onError}
          aria-label="Radio Group"
      >
        {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroup.Item
                  className="w-5 h-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={option.value}
                  id={option.value}
              >
                <RadioGroup.Indicator className="w-full h-full bg-blue-500 rounded-full" />
              </RadioGroup.Item>
              <label className="text-sm" htmlFor={option.value}>
                {option.label}
              </label>
            </div>
        ))}
      </RadioGroup.Root>
  );
};

export default InputRadioGroup;
