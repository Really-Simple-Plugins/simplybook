import CheckboxField from "../CheckboxField";
import ColorPickerField from "../ColorPickerField";
import SelectField from "../SelectField";
import {Controller} from "react-hook-form";
import {forwardRef} from "react";

/**
 * ThemeConfigGroupItem component
 * @param {object} props - Props passed from parent component
 * @param {object} props.control - Control object from react-hook-form, without it, the field won't work. Will also
 * be used for the value of the fields.
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly control?: *, readonly item?: *}> & React.RefAttributes<unknown>>}
 */
const ThemeConfigGroupItem = forwardRef(({
     control,
     item,
}, ref) => {
    return (
        <Controller
            control={control}
            name={`theme_settings.${item.config_key}`}
            defaultValue={item.default_value}
            render={({ field, fieldState }) => {

                /**
                 * Skip rendering if the item is not visible or widget support
                 * is not enabled. This is also done in
                 * {@link ThemeConfigGroup:groupedSettings} but added here just
                 * to be sure.
                 */
                if (item.is_visible == false || item.widget_support == false) {
                    return null;
                }

                if (item.config_type === 'checkbox') {
                    return (
                        <CheckboxField
                            {...field}
                            fieldState={fieldState}
                            setting={item}
                            label={item.config_title}
                            className="theme-config-field"
                        />
                    );
                }

                /**
                 * Render all color types as color pickers. This should catch
                 * values like: base_color, color, etc.
                 */
                if (item.config_type.includes('color')) {
                    return (
                        <ColorPickerField
                            {...field}
                            fieldState={fieldState}
                            setting={item}
                            label={item.config_title}
                            className="theme-config-field"
                        />
                    );
                }

                if (item.config_type === 'select') {
                    return (
                        <SelectField
                            {...field}
                            fieldState={fieldState}
                            setting={item}
                            label={item.config_title}
                            options={item.values}
                            className="theme-config-field"
                        />
                    );
                }

                return null;
            }}
        />
    )
});

export default ThemeConfigGroupItem;