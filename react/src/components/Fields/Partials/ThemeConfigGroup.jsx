import {forwardRef} from "react";
import ThemeConfigGroupItem from "./ThemeConfigGroupItem";

const ThemeConfigGroup = forwardRef(({
     control,
     parentSetting,
     selectedTheme,
}, ref) => {

    const configTypePriority = {
        'checkbox': 10,
        'select': 9,
        'color': 8,
    };

    /**
     * Group the settings by their config_type. This results in color pickers,
     * selects and checkboxes being grouped together. For selects the values are
     * mapped to a more user-friendly format. Config titles are also translated.
     *
     * @type {{}|{}}
     */
    const groupedSettings = Object.entries(selectedTheme?.config).reduce((groups, [setting, originalConfig]) => {

        /**
         * Reject the config if it is not visible or widget support is not
         * enabled.
         */
        if (originalConfig.is_visible == false || originalConfig.widget_support == false) {
            return groups;
        }

        // Clone the original config to avoid mutating it.
        let config = { ...originalConfig };

        /**
         * Normalize the color config_types. This will bundle values like:
         * base_color, color, gradient, etc.
         */
        let colorTypeConditions = ['color', 'gradient'];
        if (colorTypeConditions.some(type => config.config_type.includes(type))) {
            config.config_type = 'color';
        }

        /**
         * If the configType does not exist yet, create the array container for
         * it so we can push the config to it later.
         */
        if (!groups[config.config_type]) {
            groups[config.config_type] = [];
        }

        /**
         * Map select values to be translated.
         */
        if (config.config_type === 'select') {
            config.values = Object.entries(config.values).map(([key, value]) => ({
                key : key,
                value: value,
                label: String(parentSetting?.translations?.[value] ?? value),
            }));
        }

        /**
         * Translate the config title. If the config title is not set, use the
         * config key as the title.
         */
        if (!config.config_title) {
            config.config_title = (parentSetting?.translations[config.config_key] ?? config.config_key);
        } else {
            config.config_title = (parentSetting?.translations[config.config_title] ?? config.config_title);
        }

        groups[config.config_type].push(config);
        return groups;
    }, {});

    /**
     * Sort the grouped settings by their config_type. This is done by
     * assigning a priority to each config_type. The higher the priority, the
     * earlier it will be displayed.
     * @type {[string, any][]}
     */
    const sortedGroupSettings = Object.entries(groupedSettings).sort(([a], [b]) => {
        return (configTypePriority[b] ?? 0) - (configTypePriority[a] ?? 0);
    });

    return (
        <div className="theme-config">
            {sortedGroupSettings.map(([configType, configs]) => (
                <div key={configType} className={`theme-config-group theme-config-group-${configType}`}>
                    {configs.map((config) => (
                        <ThemeConfigGroupItem
                            key={config.config_key}
                            control={control}
                            item={config}
                        ></ThemeConfigGroupItem>
                    ))}
                </div>
            ))}
        </div>
    );
})

export default ThemeConfigGroup;