import {forwardRef} from "react";
import CheckboxField from "../CheckboxField";
import ColorPickerField from "../ColorPickerField";
import SelectField from "../SelectField";
import {__} from "@wordpress/i18n";

const ThemeConfigGroup = forwardRef(({
    parentSetting,
    selectedTheme,
}, ref) => {

    /**
     * Group the settings by their config_type. This results in color pickers,
     * selects and checkboxes being grouped together. For selects the values are
     * mapped to a more user-friendly format. Config titles are also translated.
     *
     * @type {{}|{}}
     */
    const groupedSettings = Object.entries(selectedTheme?.config).reduce((groups, [setting, config]) => {
        if (config.is_visible == false || config.widget_support == false) {
            return groups;
        }

        let configType = config.config_type;
        if (configType.includes('color')) {
            configType = 'color';
        }

        if (!groups[configType]) {
            groups[configType] = [];
        }

        // Map the values to be translated
        if (configType === 'select') {
            config.values = Object.entries(config.values).map(([key, value]) => ({
                key : key,
                value: value,
                label: (parentSetting?.translations[value] ?? value),
            }));
        }

        // On an empty label try to translate the config_key
        if (!config.config_title) {
            config.config_title = (parentSetting?.translations[config.config_key] ?? config.config_key);
        } else {
            config.config_title = (parentSetting?.translations[config.config_title] ?? config.config_title);
        }

        groups[configType].push(config);
        return groups;
    }, {});

    return (
        <div className="theme-config">
            {Object.entries(groupedSettings).sort(([a], [b]) => {
                const order = {
                    'checkbox': 10,
                    'select': 9,
                    'color': 8,
                }
                return (order[b] ?? 0) - (order[a] ?? 0);
            }).map(([configType, configs]) => (
                <div key={configType} className={`theme-config-group theme-config-group-${configType}`}>
                    {configs.map((config) => {
                        if (config.visible == false) {
                            return null;
                        }

                        if (config.config_type === 'checkbox') {
                            return (
                                <CheckboxField
                                    key={config.config_key}
                                    name={"theme_settings[" + config.config_key + "]"}
                                    id={"theme_settings[" + config.config_key + "]"}
                                    setting={config}
                                    label={config.config_title}
                                    value={config.default_value}
                                    className="theme-config-field"
                                />
                            );
                        }

                        if (config.config_type === 'base_color' || config.config_type === 'color') {
                            return (
                                <ColorPickerField
                                    key={config.config_key}
                                    name={"theme_settings[" + config.config_key + "]"}
                                    id={"theme_settings[" + config.config_key + "]"}
                                    setting={config}
                                    label={config.config_title}
                                    value={config.default_value}
                                    className="theme-config-field"
                                />
                            );
                        }

                        if (config.config_type === 'select') {
                            return (
                                <SelectField
                                    key={config.config_key}
                                    name={"theme_settings[" + config.config_key + "]"}
                                    id={"theme_settings[" + config.config_key + "]"}
                                    setting={config}
                                    label={config.config_title}
                                    value={config.default_value}
                                    options={config.values}
                                    className="theme-config-field"
                                />
                            );
                        }

                        return null;
                    })}
                </div>
            ))}
        </div>
    );
})

export default ThemeConfigGroup;