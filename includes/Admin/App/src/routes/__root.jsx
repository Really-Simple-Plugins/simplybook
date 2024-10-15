import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/router-devtools';
import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

const getData = async ({queryKey}) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return false;
};

export const Route = createRootRoute({
  component: () => {
    // Move all hooks to the top level
    const onboardingCompleted = useQuery({
      queryKey: ['onboardingCompleted'],
      queryFn: () => getData('onboardingCompleted'),
      placeholderData: false,
    });

    const navigate = useNavigate(); // Move this outside conditional

    // // Handle navigation in useEffect instead of inside render
    // useEffect(() => {
    //   if (onboardingCompleted.data === false && onboardingCompleted.isFetched) {
    //     navigate({
    //       to: '/onboarding/create-your-account',
    //     });
    //   }
    // }, [onboardingCompleted.data, onboardingCompleted.isFetched, navigate]);

    if (onboardingCompleted.isLoading) {
      return <div>Loading...</div>;
    }

    return (
        <>
          <Outlet />
          <TanStackRouterDevtools />
        </>
    );
  },
});
