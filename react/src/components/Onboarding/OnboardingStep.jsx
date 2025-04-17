import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import useOnboardingData from "../../hooks/useOnboardingData";
import ButtonField from "../Fields/ButtonField";
import { __ } from "@wordpress/i18n";
import useSettingsData from "../../hooks/useSettingsData";
import FormFieldWrapper from "../Forms/FormFieldWrapper";
import {useEffect, useState} from "react";
import Error from "../Errors/Error";
const OnboardingStep = ({
    path,
    title,
    subtitle,
    rightColumn,
    bottomText,
    primaryButton = { label: __("Next", "simplybook") },
    secondaryButton = null,
    customHtml = null,
    syncFieldConfig,
}) => {
    const {
        getURLForStep,
        getCurrentStepId,
        getCurrentStep,
        updateData,
        data,
        defaultData,
        isLastStep,
        recaptchaToken,
        apiError,
        setApiError,
        onboardingCompleted
    } = useOnboardingData();
    const navigate = useNavigate();
    const {
        watch,
        handleSubmit,
        control,
        setValue,
        getValues,
        reset,
        trigger,
        formState: { isDirty, errors, isValid, isValidating },
    } = useForm({
        defaultValues: defaultData,
        values: data,
        mode: "onChange",
    });
    const { getValue } = useSettingsData();
    const [companyName, setCompanyName] = useState("");
    const currentStep = getCurrentStep(path);
    const [disabled, setDisabled] = useState(!isValid);

    useEffect(() => {
        console.log('validation', isValid);
        setDisabled(!isValid);
    }, [isValid]);

    const syncFieldState = (fieldKey, initialValue, setValueCallback) => {
        let currentValue = getValues(fieldKey);
        if (currentValue) {
            setValueCallback(currentValue);
        }

        if (initialValue) {
            setValue(fieldKey, initialValue, {
                shouldValidate: true
            });
        }
    }

    if (syncFieldConfig) {
        syncFieldState(syncFieldConfig.key, syncFieldConfig.value, syncFieldConfig.setValue);
    }

    //onload of this component, check completed step simplybook.completed_step and navigate to the next step if it's above 0
    useEffect(() => {
        let currentStep = getCurrentStepId(path);
        let completedStepNext = parseInt(simplybook.completed_step) + 1 ;
        if ( completedStepNext > 1 && completedStepNext > currentStep) {
            navigate({ to: getURLForStep(completedStepNext) });
        }
    }, []);

    const onSubmit = async (formData, buttonType = "primary") => {
        setApiError(null);
        setDisabled(true);
        let updatedFormData = { ...formData };
        //add the auto generated recaptcha token to our data
        updatedFormData.recaptchaToken = recaptchaToken;

        if (buttonType === "primary" && primaryButton.modifyData) {
            updatedFormData = primaryButton.modifyData(updatedFormData);
        } else if (buttonType === "secondary" && secondaryButton.modifyData) {
            updatedFormData = secondaryButton.modifyData(updatedFormData);
        }

        if (currentStep.beforeSubmit) {
            try {
                const shouldContinue = await currentStep.beforeSubmit(updatedFormData);
                if (shouldContinue === false) {
                    setDisabled(false);
                    return; // Cancel submission only if beforeSubmit explicitly returns false
                }
            } catch (error) {
                setDisabled(false);
                console.error('Submission cancelled:', error);
                return; // Cancel submission if beforeSubmit throws an error
            }
        }
        await updateData(updatedFormData);

        setDisabled(false);

        if (buttonType === "primary" && primaryButton.navigateTo) {
            navigate({ to: primaryButton.navigateTo });
        } else if (buttonType === "secondary" && secondaryButton.navigateTo) {
            navigate({ to: secondaryButton.navigateTo });
        } else if (isLastStep(path)) {
            navigate({ to: "/" });
        } else {
            let currentStep = getCurrentStep(path);

            // There are 5 onboarding steps, but the in de currentStep.id is 0 based so 0 = onboarding step 1
            // If the onboarding already is completed, skip steps 1, 2 3 and 4, and continue from step 5
            if (currentStep.id <=3 && onboardingCompleted ) {
                navigate({ to: getURLForStep(4) });
            } else {
                navigate({ to: getURLForStep(getCurrentStepId(path) + 1) });
            }
        }
    };

    useEffect(() => {
        let companyName = getValue("company_name");
        if ( companyName && companyName.length>0 ) {
            setCompanyName(companyName);
        }
    }, [getValue("company_name")]);

    return (
        <>
            <div className="w-full col-span-4 col-start-3 my-12 flex flex-col text-black">
                <div className={"flex flex-col"}>
                    <form className="flex flex-wrap justify-between">
                        <FormFieldWrapper fields={currentStep.fields} control={control}/>
                        {customHtml}
                        <ButtonField
                            className="w-full"
                            showLoader={isValidating}
                            btnVariant="secondary"
                            label={primaryButton.label}
                            context={bottomText}
                            button={{
                                disabled: disabled,
                                onClick: handleSubmit((data) => onSubmit(data, "primary")),
                            }}
                        />
                        {secondaryButton && (
                            <ButtonField
                                btnVariant="tertiary"
                                label={secondaryButton.label}
                                button={{
                                    disabled: disabled,
                                    onClick: handleSubmit((data) => onSubmit(data, "secondary")),
                                }}
                            />
                        )}
                    </form>
                </div>
                {apiError && (
                    <Error
                        errorHeading={__("Something went wrong...", "simplybook")}
                        error={apiError}
                    />
                )}
            </div>
            <div className="col-span-4 col-start-7 row-span-2 my-12">
                {rightColumn}
            </div>
        </>
    );
};

OnboardingStep.displayName = "OnboardingStep";

export default OnboardingStep;