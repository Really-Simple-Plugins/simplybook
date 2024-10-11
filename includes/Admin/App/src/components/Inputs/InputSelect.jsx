const InputSelect = ({ value, onChange, onError, options = [] }) => {
  return (
      <Select.Root value={value} onValueChange={(val) => onChange(val)} onError={onError}>
        <Select.Trigger className="w-full flex justify-between items-center p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500">
          <Select.Value placeholder="Select an option…" />
          <Select.Icon className="ml-2">
            v
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-white border border-gray-300 rounded-md shadow-lg">
            <Select.ScrollUpButton className="flex items-center justify-center p-2">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-2">
              {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton className="flex items-center justify-center p-2">
              v
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
  );
};

const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
  return (
      <Select.Item
          className={classnames(
              "flex justify-between items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 focus:bg-gray-200",
              className
          )}
          {...props}
          ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="ml-2">
          Check
        </Select.ItemIndicator>
      </Select.Item>
  );
});

export default InputSelect;
