import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import InputText from "../../components/Inputs/InputText";
import InputSwitch from "../../components/Inputs/InputSwitch";
import InputWrapper from "../../components/Inputs/InputWrapper";
import Button from "../../components/Inputs/Button";

export const Route = createLazyFileRoute("/onboarding/create-your-account")({
  component: () => {


    return (
      <>
        <div className="col-span-5 col-start-2 my-12 flex flex-col text-black">
          <div className={"my-6 text-center"}>
            <h1 className={"text-3xl font-semibold text-black"}>
              {__("Create your free account", "simplybook")}
            </h1>
            <h2 className={"mt-2 text-base font-light text-black"}>
              {__("100% free. No credit card needed.", "simplybook")}
            </h2>
          </div>
          <div className={"flex flex-col"}>
            <InputWrapper label={__("Email address", "simplybook")} >
              <InputText placeholder={__("Email address", "simplybook")} />
            </InputWrapper>
            <Button
              onClick={() => {}}
              link={{
                to: "/onboarding/tips-and-tricks",
              }}
            >
              {__("Verify email", "simplybook")}
            </Button>
            <InputWrapper label={__("I have read the Terms & Conditions", "simplybook") } reverseLabel={true}>
              <InputSwitch />
            </InputWrapper>
            <p className="mt-4 text-xs text-center font-light text-gray-600">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut
            </p>
          </div>
        </div>
        <div className="col-span-5 col-start-7 my-12">
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
