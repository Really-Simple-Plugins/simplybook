import React from "react";
import { Link } from "@tanstack/react-router";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";

const Header = () => {
  const linkClassName =
    "py-6 px-5 border-b-4  border-transparent [&.active]:border-blue-500 focus:outline-none";

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
            Dashboard
          </Link>
          <a
            href="https://simplybook.me"
            target={"_blank"}
            className={linkClassName}
          >
            Clients (O)
          </a>
          <a
            href="https://simplybook.me"
            target={"_blank"}
            className={linkClassName}
          >
            Calendar (O)
          </a>
          <Link to="/settings/general" className={linkClassName}>
            Settings
          </Link>
        </div>
        <div className="flex-1 items-center gap-6 px-4">
          <a
            href="https://simplybook.me"
            target={"_blank"}
            className="px-2[&.active]:font-bold float-right py-6"
          >
            Upgrade
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
