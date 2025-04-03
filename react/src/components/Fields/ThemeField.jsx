import React, { forwardRef, useState } from "react";
import HttpClient from "../../api/requests/HttpClient";
import {useQuery} from "@tanstack/react-query";
import useOnboardingData from "../../hooks/useOnboardingData";
import SelectField from "./SelectField";
import ThemeConfigGroup from "./Partials/ThemeConfigGroup";

/**
 * ThemeConfigField component
 * @return {JSX.Element}
 */
const ThemeField = forwardRef(({ ...props }, ref) => {
    const { onboardingCompleted } = useOnboardingData();
    const [selectedTheme, setSelectedTheme] = useState(null);

    const route = 'theme_list';
    const client = new HttpClient(route);

    const {isLoading, error, data: response} = useQuery({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
        enabled: !!onboardingCompleted,
    });

    if (!selectedTheme && response?.data?.length > 0) {
        setSelectedTheme(
            response?.data?.find((theme) => theme.name === props?.setting?.value)
        );
    }

    if (error !== null) {
        console.error('Error fetching domain data:', error.message);
    }

    const onChange = (e) => {
        const selectedOnChange = response?.data?.find((theme) => theme.name === e.target.value);
        setSelectedTheme(selectedOnChange);
    }

    const mappedSelectedThemeOptions = response?.data?.map((theme) => ({
        label: theme.title.charAt(0).toUpperCase() + theme.title.slice(1),
        value: theme.name,
        key: theme.id,
    }));

    return (
        <>
            <SelectField
                setting={props?.setting}
                name={"theme_settings[" + props?.setting?.id + "]"}
                label={props?.setting?.label}
                help={props?.setting?.help}
                className="mb-6"
                options={mappedSelectedThemeOptions}
                value={selectedTheme?.name ?? props?.setting?.value}
                onChange={onChange}
                error={error?.message}
                required={props?.setting?.required}
                inputId={props?.setting?.id}
                disabled={isLoading}
            >
            </SelectField>

            {selectedTheme && selectedTheme?.config && (
                <ThemeConfigGroup
                    parentSetting={props?.setting}
                    selectedTheme={selectedTheme}
                />
            )}

            <input type="hidden" name="settings_section" value="theme_settings" />
        </>
    );
});

ThemeField.displayName = "ThemeField";
export default ThemeField;