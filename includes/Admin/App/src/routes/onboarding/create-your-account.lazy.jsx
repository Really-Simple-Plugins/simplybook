import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import SwitchInput from "../../components/Inputs/SwitchInput";
import InputField from "../../components/Forms/InputField";
import ButtonInput from "../../components/Inputs/ButtonInput";
import EmailField from "../../components/Fields/EmailField";
import SwitchField from '../../components/Fields/SwitchField';

export const Route = createLazyFileRoute("/onboarding/create-your-account")({
  component: () => {


    return (
      <>
        <div className="col-span-4 col-start-3 my-12 flex flex-col text-black">
          <div className={"my-6 text-center"}>
            <h1 className={"text-3xl font-semibold text-black"}>
              {__("Create your free account", "simplybook")}
            </h1>
            <h2 className={"mt-2 text-base font-light text-black"}>
              {__("100% free. No credit card needed.", "simplybook")}
            </h2>
          </div>
          <div className={"flex flex-col"}>
            <EmailField
                label={__("Email address", "simplybook")}
                help={__("We'll never share your email with anyone else.", "simplybook")}
                placeholder={__("Enter your email address", "simplybook")}


              />
            <ButtonInput
              onClick={() => {}}
              link={{
                to: "/onboarding/tips-and-tricks",
              }}
            >
              {__("Verify email", "simplybook")}
            </ButtonInput>
            <SwitchField
                label={__("I have read the Terms & Conditions", "simplybook") }
                value={true}
                onChange={() => {}}
            />
            <p className="mt-4 text-xs text-center font-light text-gray-600">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut
            </p>
          </div>
        </div>
        <div className="col-span-4 col-start-7 my-12">
          <iframe
            width="100%"
            className={"aspect-video"}
            src="https://www.youtube-nocookie.com/embed/adYNTa9Gicw?si=A1cJfYkkfvlE9Yn0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </>
    );
  },
});
