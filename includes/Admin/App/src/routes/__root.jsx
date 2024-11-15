import {
  createRootRoute,
  Link,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ErrorBoundary from "../components/Common/ErrorBoundary";

const getData = async ({ queryKey }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return false;
};

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    if (!simplybook.isOnboardingCompleted) {
      redirect({
        to: "/onboarding/create-your-account",
      });
    }
  },
  component: () => {
    const navigate = useNavigate(); // Move this outside conditional

    return (
      <ErrorBoundary>
        <Outlet />
        <TanStackRouterDevtools />
      </ErrorBoundary>
    );
  },
});
