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
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: defaultData,
    values: data,
    mode: "onBlur",
  });

  const currentStep = getCurrentStep(path);
  const [disabled, setDisabled] = useState(false);

  // Update confirmation code in onboarding data. Otherwise the recaptcha code clears the confirmation code
  const formData = watch();
  useEffect(() => {
    updateData({'confirmation-code': formData['confirmation-code']});
  }, [formData['confirmation-code']]);

  //onload of this component, check completed step simplybook.completed_step and navigate to the next step if it's above 0
    useEffect(() => {
      let currentStep = getCurrentStepId(path);
      let completedStepNext = parseInt(simplybook.completed_step) + 1 ;
      if ( completedStepNext > 1 && completedStepNext > currentStep) {
        console.log("has completed step, navigate to next step ", completedStepNext);
        console.log(getURLForStep(completedStepNext));
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
          return; // Cancel submission only if beforeSubmit explicitly returns false
        }
      } catch (error) {
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

      //if onboarding already completed, skip steps 1, 2 3 and 4, and continue from step 5
      if (currentStep.id <=4 && onboardingCompleted ) {
        navigate({ to: getURLForStep(5) });
      } else {
        navigate({ to: getURLForStep(getCurrentStepId(path) + 1) });
      }
    }
  };

  return (
    <>
      <div className="col-span-4 col-start-3 my-12 flex flex-col text-black">
        <div className={"my-6 text-center"}>
          <h1 className={"text-3xl font-semibold text-black"}>{title}</h1>
          {subtitle && (
              <h2 className={"mt-2 text-base font-light text-black"}>
                {subtitle}
              </h2>

          )}
          <Error error={apiError}/>
        </div>
        <div className={"flex flex-col"}>
          <form>
            <FormFieldWrapper fields={currentStep.fields} control={control}/>
            {customHtml}
            <ButtonField
                showLoader={disabled}
                btnVariant="primary"
                label={primaryButton.label}
                context={bottomText}
                disabled={disabled}
                onClick={handleSubmit((data) => onSubmit(data, "primary"))}
            />
            {secondaryButton && (
                <ButtonField
                    btnVariant="tertiary"
                    disabled={disabled}
                    label={secondaryButton.label}
                    onClick={handleSubmit((data) => onSubmit(data, "secondary"))}
                />
            )}
          </form>
        </div>
        <Error error={apiError}/>
      </div>
      <div className="col-span-4 col-start-7 row-span-2 my-12">
        {rightColumn}
      </div>
    </>
  );
};

OnboardingStep.displayName = "OnboardingStep";

export default OnboardingStep;
