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
