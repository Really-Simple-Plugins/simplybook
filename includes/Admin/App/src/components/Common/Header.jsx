import React from "react";
import { Link } from "@tanstack/react-router";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";
import Icon from "./Icon";
import { __ } from "@wordpress/i18n";
import ButtonInput from "../Inputs/ButtonInput";

const Header = () => {
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
          <Link to="/" className={linkClassName}>
            {__("Dashboard", "simplybook")}
          </Link>
          <a
            href="https://simplybook.me"
            target={"_blank"}
            className={linkClassName}
          >
            {__("Clients", "simplybook")}
            <Icon name="square-arrow-up-right" />
          </a>
          <a
            href="https://simplybook.me"
            target={"_blank"}
            className={linkClassName}
          >
            {__("Calendar", "simplybook")}
            <Icon name="square-arrow-up-right" />
          </a>
          <Link to="/settings/general" className={linkClassName}>
            Settings
          </Link>
        </div>
        <div className="float-right ml-auto flex items-center gap-6 px-4">
          <ButtonInput
            link={{ to: "https://simplybook.me" }}
            btnVariant="tertiary"
          >
            {__("Upgrade", "simplybook")}
          </ButtonInput>
        </div>
      </div>
    </div>
  );
};

Header.displayName = "Header";

export default Header;
