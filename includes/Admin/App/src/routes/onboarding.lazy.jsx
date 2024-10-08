import {createLazyFileRoute, Outlet} from '@tanstack/react-router';
import { ReactComponent as Logo } from '../../../../assets/img/logo.svg';
import {__} from '@wordpress/i18n';

export const Route = createLazyFileRoute('/onboarding')({
  component: () => <OnboardingPage/>,
});

function OnboardingPage() {

  return (
      <div className={"bg-white"}>
        <div className="flex items-center mx-auto max-w-screen-xl  justify-between">
          <Logo className="w-40 py-2 m-5"/>
          <span>{__('Already got an account?', 'simplybook')}  <a className="font-bold " href={'https://simplybook.me'}>{__('Sign in here')}</a> </span>
        </div>
        <div className="flex mx-auto max-w-screen-xl py-5">
          <div className="grid grid-cols-12 grid-rows-5 gap-24 w-full min-h-full">
            <Outlet/>
          </div>
        </div>
      </div>
  );
}