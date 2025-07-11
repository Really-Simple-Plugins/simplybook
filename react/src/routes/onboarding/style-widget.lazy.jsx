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

        const [primaryColor, setPrimaryColor] = useState(null);
        const [secondaryColor, setSecondaryColor] = useState(null);
        const [activeColor, setActiveColor] = useState(null);

        useEffect(() => {
            if (themeColors) {
                setPrimaryColor(themeColors.primary);
                setSecondaryColor(themeColors.secondary);
                setActiveColor(themeColors.active);
            }
        }, [themeColors]);

        // Show loading state until colors are loaded
        const showColorPickers = !themeColorsLoading;

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
                                        value: primaryColor,
                                        default: themeColors.primary,
                                        disabled: !onboardingCompleted,
                                    }}
                                    setColorOnClose={(value) => {
                                        setPrimaryColor(value);
                                    }}
                                />
                                <ColorPickerField
                                    className="mr-4"
                                    label={__('Secondary', 'simplybook')}
                                    setting={{
                                        value: secondaryColor,
                                        default: themeColors.secondary,
                                        disabled: !onboardingCompleted,
                                    }}
                                    setColorOnClose={(value) => {
                                        setSecondaryColor(value);
                                    }}
                                />
                                <ColorPickerField
                                    label={__('Active', 'simplybook')}
                                    setting={{
                                        value: activeColor,
                                        default: themeColors.active,
                                        disabled: !onboardingCompleted,
                                    }}
                                    setColorOnClose={(value) => {
                                        setActiveColor(value);
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
                                data.primary_color = primaryColor;
                                data.secondary_color = secondaryColor;
                                data.active_color = activeColor;
                                return data;
                            }
                        }}
                    />
                </LeftColumn>
                <RightColumn className={"items-center flex-col flex-wrap justify-center xl:col-span-5 col-span-12 relative w-full"}>
                    <Calendar
                        primary={primaryColor}
                        secondary={secondaryColor}
                        active={activeColor}
                        onboardingCompleted={onboardingCompleted}
                    />
                </RightColumn>
            </>
        );
    },
});