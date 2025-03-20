import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import LeftColumn from "../../components/Grid/LeftColumn";
import RightColumn from "../../components/Grid/RightColumn";
import VideoFrame from "../../components/Media/VideoFrame";

const path = "/onboarding/create-your-account";

export const Route = createLazyFileRoute(path)({
  component: () => (
    <>
      <LeftColumn
        className={"pt-20"}
      >
        <div className={"text-center"}>
          <h1 className={"text-3xl font-semibold text-black mb-4"}>
            {__("Create your free account", "simplybook")}
          </h1>
          <h2 className={"mt-2 text-base font-light text-black"}>
            {__("100% free. No credit card needed.", "simplybook")}
          </h2>

        </div>  
        <OnboardingStep
          path={path}
        />
      </LeftColumn>
      <RightColumn>
        <div className="relative">
          <VideoFrame
            FrameWrapperClass="h-[350px] aspect-w-16 aspect-h-9"
            className="w-full h-full"
            src="https://www.youtube.com/embed/qgMn9dKJAt4"
            title="How to get started with SimplyBook.me"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            refPolicy="strict-origin-when-cross-origin"
          />
        </div>
        </RightColumn>
    </>
  ),
});
