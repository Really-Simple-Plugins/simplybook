import * as Switch from '@radix-ui/react-switch';

const SwitchInput = ({ value, onChange, onError }) => {
  return (
      <Switch.Root
          checked={value}
          onCheckedChange={(checked) => onChange(checked)}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200"
          onError={onError}
      >
        <Switch.Thumb className="inline-block h-4 w-4 transform bg-white rounded-full transition-transform" />
      </Switch.Root>
  );
};

export default SwitchInput;
