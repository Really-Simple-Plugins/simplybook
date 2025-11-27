import { render, createRoot } from "@wordpress/element";
import {loadDynamicTranslations} from "./functions/loadDynamicTranslations";

import {
  QueryClient,
  QueryCache,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  RouterProvider,
  createRouter,
  createHashHistory,
  NotFoundRoute,
} from "@tanstack/react-router";
import { Route as rootRoute } from "./routes/__root.jsx";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

const hashHistory = createHashHistory();
const HOUR_IN_SECONDS = 3600;
const queryCache = new QueryCache({
  onError: (error) => {
    // any error handling code...
  },
});
let config = {
  defaultOptions: {
    queries: {
      staleTime: HOUR_IN_SECONDS * 1000, // hour in ms
      refetchOnWindowFocus: false,
      retry: false,
      suspense: false,
    },
  },
};

// merge queryCache with config
config = { ...config, ...{ queryCache } };

const queryClient = new QueryClient(config);

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <div className={"simplybook"}>404 Not Found</div>,
});

const router = createRouter({
  routeTree,
  notFoundRoute,
  context: {
    queryClient,
  },
  history: hashHistory,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

// Lazy load dev tools
const ReactQueryDevtools = React.lazy(() =>
    import("@tanstack/react-query-devtools").then((d) => ({
      default: d.ReactQueryDevtools,
    })),
);

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("simplybook_app");
  if (container) {
    // Load dynamic translations before rendering
    loadDynamicTranslations();

    // Set RTL direction on the container element based on WordPress settings
    const isRtl = window.simplybook?.is_rtl ?? false;
    container.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

    // Disable React Query's suspense by default
    config.defaultOptions.queries.suspense = false;

    // Don't clear the container immediately
    const root = createRoot(container, {
      hydrate: true, // Tell React to hydrate instead of render
      onRecoverableError: (err) => {
        console.warn('Hydration error (usually harmless):', err);
      },
    });

    root.render(
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            {process.env.NODE_ENV === "development" && (
                <React.Suspense>
                  <ReactQueryDevtools />
                </React.Suspense>
            )}
          </QueryClientProvider>
        </React.StrictMode>,
    );
  }
});