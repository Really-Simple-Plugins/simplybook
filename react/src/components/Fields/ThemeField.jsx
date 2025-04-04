import React, { forwardRef, useState, useEffect } from "react";
import HttpClient from "../../api/requests/HttpClient";
import {useQuery} from "@tanstack/react-query";
import useOnboardingData from "../../hooks/useOnboardingData";
import SelectField from "./SelectField";
import ThemeConfigGroup from "./Partials/ThemeConfigGroup";
import { Controller } from "react-hook-form";

/**
 * ThemeConfigField component
 * @param {object} props - Props passed from parent component
 * @param {object} props.control - Control object from react-hook-form, without it, the field won't work
 * @return {JSX.Element}
 */
const ThemeField = forwardRef(({ control, ...props }, ref) => {
    const {onboardingCompleted} = useOnboardingData();
    const [selectedTheme, setSelectedTheme] = useState(null);

    /**
     * Setup HttpClient
     */
    const route = 'theme_list';
    const client = new HttpClient(route);

    /**
     * Fetch domain data using React Query
     */
    const {isLoading, error, data: response} = useQuery({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
        enabled: !!onboardingCompleted,
    });

    /**
     * Set a default theme if none is selected and response data is available.
     */
    useEffect(() => {
        if (!selectedTheme && response?.data?.length > 0) {
            const defaultTheme = response.data.find(
                (theme) => theme.name === props?.setting?.default
            );
            setSelectedTheme(defaultTheme);
        }
    }, [response, props?.setting?.default]);

    /**
     * Show error in the console for easy debugging
     */
    if (error !== null) {
        console.error('Error fetching domain data:', error.message);
    }

    /**
     * Map the selected theme options to the format required by SelectField
     */
    const mappedSelectedThemeOptions = response?.data?.map((theme) => ({
        label: theme.title.charAt(0).toUpperCase() + theme.title.slice(1),
        value: theme.name,
        key: theme.id,
    }));

    /**
     * Handle change event for the SelectField. We set the selected theme based
     * on the selected value from the dropdown. With the .find method, we
     * get the selected theme object from the response data instead of just the
     * theme label/value from the select.
     */
    const setSelectedThemeOnChange = (e) => {
        const selectedOnChange = response?.data?.find((theme) => theme.name === e.target.value);
        setSelectedTheme(selectedOnChange);
    }

    return (
        <>
            {error && (
                <div className="error-message">
                    {__("Error fetching theme settings. Please try again later.", "simplybook")}
                </div>
            )}

            {!isLoading && !error && selectedTheme && (
                <>
                    <Controller
                        control={control}
                        name={`theme_settings.theme`}
                        defaultValue={selectedTheme?.name || ""}
                        render={({ field }) => (
                            <SelectField
                                {...field}
                                setting={props?.setting}
                                options={mappedSelectedThemeOptions}
                                label={props?.setting?.label}
                                help={props?.setting?.help}
                                required={props?.setting?.required}
                                disabled={isLoading}
                                onChange={(e) => {
                                    field.onChange(e);
                                    setSelectedThemeOnChange(e);
                                }}
                            />
                        )}
                    ></Controller>

                    {selectedTheme?.config && (
                        <ThemeConfigGroup
                            control={control}
                            parentSetting={props?.setting}
                            selectedTheme={selectedTheme}
                        />
                    )}
                </>
            )}
        </>
    );
});

ThemeField.displayName = "ThemeField";
export default ThemeField;