import {
  render, createRoot,
} from '@wordpress/element';

import './tailwind.css';

import {
  QueryClient,
  QueryCache,
  QueryClientProvider,
} from '@tanstack/react-query';

import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import {
  RouterProvider,
  createRouter,
  createHashHistory,
  NotFoundRoute,
} from '@tanstack/react-router';
import {Route as rootRoute} from './routes/__root.jsx';

// Import the generated route tree
import {routeTree} from './routeTree.gen';

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
    },
  },
};

// merge queryCache with config
config = {...config, ...{queryCache}};

const queryClient = new QueryClient(config);

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <div className={'simplybook'}>404 Not Found</div>,
});

const router = createRouter({
  routeTree,
  notFoundRoute,
  context: {
    queryClient,
  },
  history: hashHistory,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('simplybook_app');
  if (container) {
    if (createRoot) {
      createRoot(container).render(
          <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
              <ReactQueryDevtools/>
            </QueryClientProvider>
          </React.StrictMode>,
      );
    }
    else {
      render(
          <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
              <ReactQueryDevtools/>
            </QueryClientProvider>
          </React.StrictMode>,
          container,
      );
    }
  }
});


