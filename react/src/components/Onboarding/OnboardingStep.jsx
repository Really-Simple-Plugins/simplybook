import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import useOnboardingData from "../../hooks/useOnboardingData";
import ButtonField from "../Fields/ButtonField";
import { __ } from "@wordpress/i18n";
import useSettingsData from "../../hooks/useSettingsData";
import FormFieldWrapper from "../Forms/FormFieldWrapper";
import {useEffect, useState} from "react";
import Error from "../Errors/Error";
import HttpClient from "../../api/requests/HttpClient";
import { useMutation } from "@tanstack/react-query";

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
    onSubmitError = null,
}) => {

    const {
        getURLForStep,
        getCurrentStepId,
        getCurrentStep,
        updateData,
        data,
        defaultData,
        isLastStep,
        apiError,
        setApiError,
        onboardingCompleted,
        setOnboardingCompleted
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
        formState: {
            isDirty,
            errors,
            isValid,
            isValidating,
            touchedFields,
        },
    } = useForm({
        defaultValues: defaultData,
        values: data,
        mode: "onTouched",
    });
    const { getValue } = useSettingsData();
    const [companyName, setCompanyName] = useState("");
    const currentStep = getCurrentStep(path);
    const currentStepId = getCurrentStepId(path);
    const [disabled, setDisabled] = useState(!isValid);

    const httpClient = new HttpClient();

    // Set disabled state based on isValid
    useEffect(() => {
        setDisabled(!isValid);
    }, [isValid]);

    /**
     * Synchronize the field state with the initial value.
     *
     * @internal To prevent us resetting the field value when the user empties
     * the field, we check if the field has been touched. If it has been
     * touched, we don't reset the value to the initial value.
     */
    const syncFieldState = (fieldKey, initialValue, setValueCallback) => {
        let currentValue = getValues(fieldKey);
        let hasBeenTouched = touchedFields[fieldKey];

        if (hasBeenTouched) { // !important
            return setValueCallback(currentValue);
        }

        if (initialValue !== undefined) {
            return setValue(fieldKey, initialValue, {
                shouldValidate: true,
                shouldTouch: true, // !important
            });
        }
    }

    if (syncFieldConfig) {
        syncFieldState(syncFieldConfig.key, syncFieldConfig.value, syncFieldConfig.setValue);
    }

    const { mutate: onSubmit, isPending } = useMutation({
        mutationFn: async (formData, buttonType = "primary") => {
            setApiError(null);
            setDisabled(true);
            let updatedFormData = { ...formData };

            if (buttonType === "primary" && primaryButton.modifyData) {
                updatedFormData = primaryButton.modifyData(updatedFormData);
            } else if (buttonType === "secondary" && secondaryButton.modifyData) {
                updatedFormData = secondaryButton.modifyData(updatedFormData);
            }

            if (currentStep.beforeSubmit) {
                try {
                    const shouldContinue = await currentStep.beforeSubmit(updatedFormData);
                    if (shouldContinue === false) {
                        // Call onSubmitError callback if provided
                        onSubmitError?.();
                        setDisabled(false);
                        return; // Cancel submission only if beforeSubmit explicitly returns false
                    }
                } catch (error) {
                    onSubmitError?.();
                    setDisabled(false);
                    console.error('Submission cancelled:', error);
                    return;
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

                // There are 2 onboarding steps (1=create-account, 2=style-widget)
                // If the onboarding already is completed, skip step 1 and continue from step 2
                if (currentStep.id <= 1 && onboardingCompleted) {
                    navigate({ to: getURLForStep(2) });
                } else {
                    navigate({ to: getURLForStep(getCurrentStepId(path) + 1) });
                }
            }
        },
    })

    useEffect(() => {
        let companyName = getValue("company_name");
        if ( companyName && companyName.length>0 ) {
            setCompanyName(companyName);
        }
    }, [getValue("company_name")]);

    /**
     * Submit a request to retry the onboarding process. Under the hood this
     * means we are deleting all old simplybook data. On success, we navigate
     * back to step 1.
     */
    const restartOnboarding = async () => {
        try {
            await httpClient.setRoute('onboarding/retry_onboarding').setPayload({
                user_confirmed: true,
            }).post();
        } catch (error) {
            setApiError(error.message || __("An error occurred while restarting the onboarding.", "simplybook"));
            return false;
        }

        setOnboardingCompleted(false);
        setApiError('');
        await navigate({to: getURLForStep(1)});
    }

    return (
        <>
            <div className={`w-full col-span-4 col-start-3 ${currentStep.fields?.length ? "my-12" : ""} flex flex-col text-black`}>
                <div className={"flex flex-col"}>
                    <form className="flex flex-wrap justify-between">
                        <FormFieldWrapper fields={currentStep.fields} control={control}/>
                        {customHtml}
                        <ButtonField
                            className="w-full mt-4"
                            showLoader={(isValidating ||isPending)}
                            btnVariant="secondary"
                            label={primaryButton.label ?? __("Next", "simplybook")}
                            context={bottomText}
                            button={{
                                disabled: (primaryButton.disabled || disabled || isPending),
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
                        errorHeading={__("Something went wrong", "simplybook")}
                        error={apiError}
                        resolve={{
                            callback: restartOnboarding,
                            label: __("Or restart the onboarding", "simplybook"),
                        }}
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