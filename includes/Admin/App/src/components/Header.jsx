import {Link} from '@tanstack/react-router';
import { ReactComponent as Logo } from '../../../../assets/img/logo.svg';

const  Header = () => {
  const linkClassName = "py-6 px-5 border-b-4  border-transparent [&.active]:border-blue-500 focus:outline-none";

  return (
      <div className="bg-white shadow-md">
        <div className="flex items-center mx-auto max-w-screen-2xl mx-5">
          <div>
            <Link to="/">
              <Logo className="w-40 h-12 py-2 px-5"/>
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/" className={linkClassName}>
              Dashboard
            </Link>
            <a href="https://simplybook.me" target={"_blank"}
               className={linkClassName}>
              Clients (O)
            </a>
            <a href="https://simplybook.me" target={"_blank"}
               className={linkClassName}>
              Calendar (O)
            </a>
            <Link to="/settings/general"
                  className={linkClassName}>
              Settings
            </Link>
          </div>
          <div className="flex-1 gap-6 items-center px-4">
            <a href="https://simplybook.me" target={"_blank"}
               className="float-right py-6 px-2[&.active]:font-bold">
              Upgrade
            </a>
          </div>
        </div>
      </div>
  );
}

export default Header;