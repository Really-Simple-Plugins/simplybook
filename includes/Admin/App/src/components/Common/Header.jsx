import React from "react";
import { Link } from "@tanstack/react-router";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";
import Icon from "./Icon";
import getLoginUrl from "../../api/endpoints/getLoginUrl";
import { __ } from "@wordpress/i18n";
import ButtonInput from "../Inputs/ButtonInput";

const Header = () => {
  const [alreadyLoggedIn, setAlreadyLoggedIn] = React.useState(false);
  const loginTo = async (e, page) => {
    e.preventDefault();
    console.log("get login url for ", page);
    //some pages in simplybook:
    //client: /client
    //services: /management/#services
    //providers: /management/#providers
    //calendar: /index/index
    //dashboard: /dashboard/new

    let loginUrl = '';
    if ( alreadyLoggedIn ) {
      loginUrl = await getLoginUrl('url');
      loginUrl += '/' + page;
    } else {
      loginUrl = await getLoginUrl('login_url');
      loginUrl += '?back_url=/' + page + '/';
    }

    //open a new tab with the login url
    window.open(loginUrl, "_blank");
    //focus on the new tab
    window.focus();
    setAlreadyLoggedIn(true);
  }
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
            href="#"
            className={linkClassName}
            onClick={ (e) => loginTo(e, 'client') }
          >
            {__("Clients", "simplybook")}
            <Icon name="square-arrow-up-right" className="px-2"/>
          </a>
          <a
              href="#"
              className={linkClassName}
              onClick={ (e) => loginTo(e, 'index/index') }
          >
            {__("Calendar", "simplybook")}
            <Icon name="square-arrow-up-right" className="px-2" />
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
