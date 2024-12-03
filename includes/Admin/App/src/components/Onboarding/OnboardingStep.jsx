import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import useOnboardingData from "../../hooks/useOnboardingData";
import FormField from "../Forms/FormField";
import ButtonField from "../Fields/ButtonField";
import { __ } from "@wordpress/i18n";

const OnboardingStep = ({
  path,
  title,
  subtitle,
  rightColumn,
  bottomText,
  primaryButton = { label: __("Next", "simplybook") },
  secondaryButton = null,
}) => {
  const {
    getURLForStep,
    getCurrentStepId,
    getCurrentStep,
    updateData,
    data,
    defaultData,
    isLastStep,
  } = useOnboardingData();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: defaultData,
    values: data,
    mode: "onBlur",
  });

  const currentStep = getCurrentStep(path);

  const onSubmit = async (formData, buttonType = "primary") => {
    let updatedFormData = { ...formData };

    if (buttonType === "primary" && primaryButton.modifyData) {
      updatedFormData = primaryButton.modifyData(updatedFormData);
    } else if (buttonType === "secondary" && secondaryButton.modifyData) {
      updatedFormData = secondaryButton.modifyData(updatedFormData);
    }

    if (currentStep.beforeSubmit) {
      currentStep.beforeSubmit(updatedFormData);
    }

    updateData(updatedFormData);

    if (buttonType === "primary" && primaryButton.navigateTo) {
      navigate({ to: primaryButton.navigateTo });
    } else if (buttonType === "secondary" && secondaryButton.navigateTo) {
      navigate({ to: secondaryButton.navigateTo });
    } else if (isLastStep(path)) {
      navigate({ to: "/" });
    } else {
      navigate({ to: getURLForStep(getCurrentStepId(path) + 1) });
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
        </div>
        <div className={"flex flex-col"}>
          <form>
            {currentStep.fields.map((field) => (
              <FormField setting={field} key={field.id} control={control} />
            ))}
            <ButtonField
              btnVariant="primary"
              label={primaryButton.label}
              context={bottomText}
              onClick={handleSubmit((data) => onSubmit(data, "primary"))}
            />
            {secondaryButton && (
              <ButtonField
                btnVariant="tertiary"
                label={secondaryButton.label}
                onClick={handleSubmit((data) => onSubmit(data, "secondary"))}
              />
            )}
          </form>
        </div>
      </div>
      <div className="col-span-4 col-start-7 row-span-2 my-12">
        {rightColumn}
      </div>
    </>
  );
};

OnboardingStep.displayName = "OnboardingStep";

export default OnboardingStep;
