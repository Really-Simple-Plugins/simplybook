import {createLazyFileRoute} from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import Calendar from "../../components/Common/Calendar";
import LeftColumn from "../../components/Grid/LeftColumn";
import RightColumn from "../../components/Grid/RightColumn";
import {useState, useEffect} from "react";
import ColorPickerField from "../../components/Fields/ColorPickerField";
import useOnboardingData from "../../hooks/useOnboardingData";
import useThemeColors from "../../hooks/useThemeColors";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import Icon from "../../components/Common/Icon";

const path = "/onboarding/style-widget";
export const Route = createLazyFileRoute(path)({

    component: () => {

        const { colors: themeColors, isLoading: themeColorsLoading } = useThemeColors();
        const {onboardingCompleted} = useOnboardingData();

        const [hasTimedOut, setHasTimedOut] = useState(false);

        // Set timeout for loading
        useEffect(() => {
            const timer = setTimeout(() => {
                setHasTimedOut(true);
            }, 3000); // 3 second timeout

            return () => clearTimeout(timer);
        }, []);

        // Show loading state until colors are loaded or timeout
        const showColorPickers = !themeColorsLoading || hasTimedOut;

        return (
            <>
                <LeftColumn className={"items-center flex-col flex-wrap justify-start xl:col-span-5 col-span-12 xl:col-start-2 mt-26"}>
                    <div className={"text-center"}>
                        <h2 className={"mt-2 text-lg font-light text-black"}>
                            {__("Select your company colors", "simplybook")}
                        </h2>
                        <h1 className={"text-4xl font-semibold text-black mb-4"}>
                            {__("Next Step: Finish", "simplybook")}
                        </h1>
                    </div>
                    <div className={"flex flex-wrap justify-center mt-12 mb-12"}>
                        {!showColorPickers ? (
                            <div className="flex items-center justify-center py-8">
                                <Icon name="spinner" className="animate-spin mr-2" />
                                <span>{__('Loading theme colors...', 'simplybook')}</span>
                            </div>
                        ) : (
                            <>
                                <ColorPickerField
                                    className="mr-4"
                                    label={__('Primary', 'simplybook')}
                                    setting={{
                                        value: themeColors.primary,
                                        default: themeColors.primary,
                                        disabled: !onboardingCompleted,
                                    }}
                                />
                                <ColorPickerField
                                    className="mr-4"
                                    label={__('Secondary', 'simplybook')}
                                    setting={{
                                        value: themeColors.secondary,
                                        default: themeColors.secondary,
                                        disabled: !onboardingCompleted,
                                    }}
                                />
                                <ColorPickerField
                                    label={__('Active', 'simplybook')}
                                    setting={{
                                        value: themeColors.active,
                                        default: themeColors.active,
                                        disabled: !onboardingCompleted,
                                    }}
                                />
                            </>
                        )}
                    </div>
                    <OnboardingStep
                        path={path}
                        primaryButton={{
                            disabled: !onboardingCompleted,
                            label: __('Next step', 'simplybook'),
                            modifyData: (data) => {
                                data.primary_color = themeColors.primary;
                                data.secondary_color = themeColors.secondary;
                                data.active_color = themeColors.active;
                                return data;
                            }
                        }}
                    />
                </LeftColumn>
                <RightColumn className={"items-center flex-col flex-wrap justify-center xl:col-span-5 col-span-12 relative w-full"}>
                    <Calendar
                        primary={themeColors.primary}
                        secondary={themeColors.secondary}
                        active={themeColors.active}
                        onboardingCompleted={onboardingCompleted}
                    />
                </RightColumn>
            </>
        );
    },
});