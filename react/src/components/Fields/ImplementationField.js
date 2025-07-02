import ImplementationInput from "../Inputs/ImplementationInput";
import useSettingsData from "../../hooks/useSettingsData";
const ImplementationField = ({ options, value, onChange, ...props }) => {
    let defaultValue = props.setting && props.setting.default ? props.setting.default : "";
    let actualValue = value || defaultValue;
    const {setValue} = useSettingsData();

    const handleChange = async (value) => {
        await setValue(props.setting.id, value);
        onChange(value);
    }
    return (
        <div className="w-full mb-8">
            <ImplementationInput
                options={options}
                value={actualValue}
                onChange={(value) => handleChange(value)}
                {...props}
            />
        </div>
    );
};

export default ImplementationField;