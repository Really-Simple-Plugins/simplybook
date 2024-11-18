import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import useOnboardingStore from "../../stores/onboardingStore";
import FormField from "../Forms/FormField";
import ButtonField from "../Fields/ButtonField";
import { __ } from "@wordpress/i18n";

const OnboardingStep = ({
  path,
  title,
  subtitle,
  rightColumn,
  bottomText,
  buttonLabel = __("Next", "simplybook")
}) => {
  const {
    getURLForStep,
    getCurrentStepId,
    getCurrentStep,
    updateData,
    data,
    defaultData,
    isLastStep,
  } = useOnboardingStore();
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

  const onSubmit = (formData) => {
    if (currentStep.beforeSubmit) {
      currentStep.beforeSubmit(formData);
    }

    if (isLastStep(path)) {
        navigate({ to: "/" });
        // @todo: action to save and redirect to the dashboard
        return;
    } else {
      updateData(formData);
      navigate({ to: getURLForStep(getCurrentStepId(path) + 1) });
    }
  }

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
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            {currentStep.fields.map((field) => (
              <FormField setting={field} key={field.id} control={control} />
            ))}
            <ButtonField btnVariant="primary" label={buttonLabel} />
            {bottomText && (
              <p className="mt-4 text-center text-xs font-light text-gray-600">
                {bottomText}
              </p>
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

OnboardingStep.displayName = 'OnboardingStep';

export default OnboardingStep; 