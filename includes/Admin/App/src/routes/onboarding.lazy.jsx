import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import { __ } from "@wordpress/i18n";
import OnboardingFooter from "../components/Onboarding/OnboardingFooter";

export const Route = createLazyFileRoute("/onboarding")({
  component: () => <OnboardingPage />,
});

function OnboardingPage() {
  return (
    <div className={"bg-white"}>
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
        <Logo className="m-5 w-40 py-2" />
        <span className={"m-5 text-black"}>
          {__("Already got an account?", "simplybook")}{" "}
          <a className="font-bold text-black" href={"https://simplybook.me"}>
            {__("Sign in here")}
          </a>{" "}
        </span>
      </div>
      <div className="mx-auto flex max-w-screen-2xl flex-col py-5">
        <div className="grid min-h-full w-full grid-cols-12 gap-24">
          <Outlet />
        </div>
      </div>
      <OnboardingFooter />
    </div>
  );
}
