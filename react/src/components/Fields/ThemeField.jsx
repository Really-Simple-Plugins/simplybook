import React, { forwardRef, useEffect, useMemo } from "react";
import HttpClient from "../../api/requests/HttpClient";
import {useQuery} from "@tanstack/react-query";
import useOnboardingData from "../../hooks/useOnboardingData";
import SelectField from "./SelectField";
import ThemeConfigGroup from "./Partials/ThemeConfigGroup";
import { Controller } from "react-hook-form";
import { __ } from "@wordpress/i18n";

/**
 * ThemeField component
 * @param {object} props - Props passed from parent component
 * @param {object} props.control - Control object from react-hook-form, without it, the field won't work
 * @return {JSX.Element}
 */
const ThemeField = forwardRef(({ control, reset, ...props }, ref) => {
    const { onboardingCompleted } = useOnboardingData();

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
     * Show error in the console for easy debugging
     */
    if (error !== null) {
        console.error('Error fetching domain data:', error.message);
    }

    /**
     * Map the selected theme options to the format required by SelectField,
     * memoize the data so we don't redo it on re-render.
     */
    const mappedSelectedThemeOptions = useMemo(() => {
        return response?.data?.map((theme) => ({
            label: theme.title.charAt(0).toUpperCase() + theme.title.slice(1),
            value: theme.name,
            key: theme.id,
        })) ?? [];
    }, [response]);

    /**
     * Find the selected theme object in the response data based on the passed
     * theme name.
     */
    const findSelectedThemeObject = (themeName) => {
        return response?.data?.find((theme) => theme.name === themeName);
    };

    return (
        <>
            {error && (
                <div className="error-message">
                    {__("Error fetching theme settings. Please try again later.", "simplybook")}
                </div>
            )}

            {!isLoading && !error && response?.data && (
                <Controller
                    control={control}
                    name={props?.setting?.id}
                    defaultValue={(props?.setting?.value ?? props?.setting?.default ?? "")}
                    render={({ field }) => {
                        const selectedThemeObject = findSelectedThemeObject(field.value);

                        return (
                            <>
                                <SelectField
                                    {...field}
                                    setting={props?.setting}
                                    options={mappedSelectedThemeOptions}
                                    label={props?.setting?.label}
                                    help={props?.setting?.help}
                                    required={props?.setting?.required}
                                    disabled={isLoading}
                                    className="w-full"
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                />

                                {selectedThemeObject?.config && (
                                    <ThemeConfigGroup
                                        control={control}
                                        parentSetting={props?.setting}
                                        selectedTheme={selectedThemeObject}
                                    />
                                )}
                            </>
                        );
                    }}
                />
            )}
        </>
    );
});

ThemeField.displayName = "ThemeField";
export default ThemeField;