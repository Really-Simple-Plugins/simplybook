import {
  createRootRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import ErrorBoundary from "../components/Common/ErrorBoundary";

const getDefaultRoute = () => simplybook?.default_route ?? "";

// Lazy load router devtools
const TanStackRouterDevtools = React.lazy(() =>
  import('@tanstack/router-devtools').then(d => ({
    default: d.TanStackRouterDevtools
  }))
);

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const defaultRoute = getDefaultRoute();

    if (defaultRoute && (location.pathname === "/" || location.pathname === "")) {
      throw redirect({
        to: defaultRoute,
        replace: true,
      });
    }
  },
  component: () => {

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
