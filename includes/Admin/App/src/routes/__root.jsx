import {
  createRootRoute,
  Link,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ErrorBoundary from "../components/Common/ErrorBoundary";
import useSettingsData from "../hooks/useSettingsData";

const getData = async ({ queryKey }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return false;
};

// Lazy load router devtools
const TanStackRouterDevtools = React.lazy(() =>
  import('@tanstack/router-devtools').then(d => ({
    default: d.TanStackRouterDevtools
  }))
);

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    console.log(location)
    if ( !simplybook.is_onboarding_completed && location.pathname !== '/onboarding/create-your-account' ) {
      console.log("should redirect")
      console.log("should redirect");
      return redirect({
        to: "/onboarding/create-your-account",
      });
    }
  },
  component: () => {
    const navigate = useNavigate(); // Move this outside conditional
    const { settings } = useSettingsData();

    return (
      <ErrorBoundary>
        <Outlet />
        {process.env.NODE_ENV === 'development' && (
          <React.Suspense>
            <TanStackRouterDevtools />
          </React.Suspense>
        )}
      </ErrorBoundary>
    );
  },
});
