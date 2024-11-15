import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import TextInput from "../../components/Inputs/TextInput";
import ButtonInput from "../../components/Inputs/ButtonInput";
import TextField from "../../components/Fields/TextField";

export const Route = createLazyFileRoute("/onboarding/implementation")({
  component: () => {
    return (
      <>
        <div className="col-span-4 col-start-3 row-span-2 my-12 flex flex-col text-black">
          <div className={"my-1 text-center"}>
            <h2 className={"mt-6 text-base"}>
              {__("Alpha Bedum Beauty & Welness")}
            </h2>
            <h1 className={"mt-2 text-2xl font-bold"}>
              {__("Implement SimplyBook.me", "simplybook")}
            </h1>
          </div>

          <div className={"my-8 grid grid-cols-2 gap-3"}>
            <TextField
              className={"col-span-2"}
              label={__("Company Name", "simplybook")}
              value={"My Business Name"}
              context={__(
                "More customisation available under settings",
                "simplybook",
              )}
            />
          </div>
          <ButtonInput
            onClick={() => {}}
            link={{
              to: "/settings/general/",
            }}
          >
            {__("Continue Configuration", "simplybook")}
          </ButtonInput>
        </div>
        <div className="col-span-4 col-start-7 py-12">Calender hier</div>
      </>
    );
  },
});
