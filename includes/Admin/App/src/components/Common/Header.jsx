import {Link} from "@tanstack/react-router";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";
import LoginLink from "./LoginLink";
import { __ } from "@wordpress/i18n";
import {useEffect} from "react";
import useOnboardingData from "../../hooks/useOnboardingData";

const Header = () => {
  const {
    onboardingCompleted
  } = useOnboardingData();

  useEffect(() => {
    if ( !onboardingCompleted && location && window.location.pathname.indexOf('onboarding/') === -1) {
        window.location.href = window.location.href.replace(/page=simplybook.*/, 'page=simplybook#/onboarding/create-your-account');
    }
  }, [onboardingCompleted] );

  const linkClassName =
    "py-6 px-5 border-b-4  border-transparent [&.active]:border-tertiary focus:outline-none";

  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-screen-2xl items-center px-5">
        <div>
          <Link to="/">
            <Logo className="h-12 w-40 px-5 py-2" />
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="/" className={linkClassName}>{__("Dashboard", "simplybook")}</Link>
          <LoginLink className={linkClassName} title={__('Clients', 'simplybook')} page="client" />
          <LoginLink className={linkClassName} title={__('Calendar', 'simplybook')} page="index/index" />
          <Link to="/settings/general" className={linkClassName}>{__("Settings",'simplybook')}</Link>
        </div>
        <div className="float-right ml-auto flex items-center gap-6 px-4">
          <LoginLink className={linkClassName} isButton={true} btnVariant="tertiary" title={__('Upgrade', 'simplybook')} page="payment-widget" />
        </div>
      </div>
    </div>
  );
};

Header.displayName = "Header";

export default Header;
