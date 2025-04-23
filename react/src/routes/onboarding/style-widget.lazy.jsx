import {createLazyFileRoute} from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import Calendar from "../../components/Common/Calendar";
import LeftColumn from "../../components/Grid/LeftColumn";
import RightColumn from "../../components/Grid/RightColumn";
import {useState} from "react";
import ColorPickerField from "../../components/Fields/ColorPickerField";
import useOnboardingData from "../../hooks/useOnboardingData";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";

const path = "/onboarding/style-widget";
export const Route = createLazyFileRoute(path)({

    component: () => {

        const defaultPrimary = '#33bb60';
        const defaultSecondary = '#d1e9c6';
        const defaultActive = '#d3e0f1';

        const [primaryColor, setPrimaryColor] = useState(defaultPrimary);
        const [secondaryColor, setSecondaryColor] = useState(defaultSecondary);
        const [activeColor, setActiveColor] = useState(defaultActive);

        const {onboardingCompleted} = useOnboardingData();

        return (
            <>
                <LeftColumn
                    className={"flex-col col-span-6"}
                >
                    <div className={"text-center"}>
                        <h2 className={"mt-2 text-lg font-light text-black"}>
                            {__("What's your style?", "simplybook")}
                        </h2>
                        <h1 className={"text-3xl font-semibold text-black mb-4"}>
                            {__("Next Step: Finish", "simplybook")}
                        </h1>
                    </div>
                    <div className={"flex flex-wrap justify-center my-4"}>
                        <ColorPickerField
                            label={__('Primary', 'simplybook')}
                            setting={{
                                value: primaryColor,
                                default: defaultPrimary,
                                disabled: !onboardingCompleted,
                            }}
                            setColorOnClose={(value) => {
                                setPrimaryColor(value);
                            }}
                        />
                        <ColorPickerField
                            label={__('Secondary', 'simplybook')}
                            setting={{
                                value: secondaryColor,
                                default: defaultSecondary,
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
                                default: defaultActive,
                                disabled: !onboardingCompleted,
                            }}
                            setColorOnClose={(value) => {
                                setActiveColor(value);
                            }}
                        />
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
                <RightColumn
                    className={"flex-col justify-center col-span-5"}
                    style={{marginTop: "-100px"}}
                >
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