import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import TextInput from "../../components/Inputs/TextInput";
import ButtonInput from "../../components/Inputs/ButtonInput";
import TextField from "../../components/Fields/TextField";

export const Route = createLazyFileRoute("/onboarding/information-check")({
  component: () => {
    return (
      <>
        <div className="col-span-4 col-start-3 row-span-2 my-12 flex flex-col text-black">
          <div className={"my-1 text-center"}>
            <h2 className={"text-base font-light text-black"}>
              {__("Nice to meet you Aert!", "simplybook")}
            </h2>
            <h1 className={"mt-2 text-3xl font-semibold text-black"}>
              {__("Is this information correct?", "simplybook")}
            </h1>
          </div>

          <div className={"my-8 grid grid-cols-2 gap-3"}>
            <TextField
              className={"col-span-2"}
              label={__("Company Name", "simplybook")}
              value={"My Business Name"}
            />
            <TextField
              className={"col-span-1"}
              label={__("Business Category", "simplybook")}
              value={"My Business Category"}
            />
            <TextField
              className={"col-span-1"}
              label={__("Service", "simplybook")}
              value={"My Service"}
            />
            <TextField
              className={"col-span-1"}
              label={__("Street", "simplybook")}
              value={"My Street"}
            />
            <TextField
              className={"col-span-1"}
              label={__("No.", "simplybook")}
              value={"123"}
            />
            <TextField
              className={"col-span-1"}
              label={__("Postal Code", "simplybook")}
              value={"12345"}
            />
            <TextField
              className={"col-span-1"}
              label={__("City", "simplybook")}
              value={"My City"}
            />
            <TextField
              className={"col-span-2"}
              label={__("Country", "simplybook")}
              value={"My Country"}
            />
          </div>
          <ButtonInput
            onClick={() => {}}
            link={{
              to: "/onboarding/style-widget",
            }}
          >
            {__("Next Step: Styling", "simplybook")}
          </ButtonInput>
        </div>
        <div className="col-span-4 col-start-7 py-12">
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
