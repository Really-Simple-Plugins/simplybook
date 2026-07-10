import { useQuery } from "@tanstack/react-query";
import useOnboardingData from "./useOnboardingData";
import { SubscriptionData } from "../types/SubscriptionData";
import HttpClient from "../api/requests/HttpClient";

const useSubscriptionData = () => {
    const { onboardingCompleted } = useOnboardingData();

    const route = 'subscription_data';
    const client = new HttpClient(route);

    const {isLoading, error, data: response, refetch} = useQuery<SubscriptionData>({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
        enabled: !!onboardingCompleted,
    });

    if (error !== null) {
        console.error('Error fetching subscription data: ', error.message);
    }

    const providersLimit = Number(response?.data?.limits?.provider_limit?.total ?? 0);

    return {
        subscription: response?.data,
        subscriptionPlan: (response?.data?.subscription_name ?? ''),
        expiresIn: (response?.data?.expire_in ?? 0),
        isExpired:(response?.data?.is_expired ?? false),
        smsRemaining: Number(response?.data?.limits?.sms_limit?.rest ?? 0),
        smsTotal: Number(response?.data?.limits?.sms_limit?.total ?? 0),
        bookingsRemaining: Number(response?.data?.limits?.sheduler_limit?.rest ?? 0),
        bookingsTotal: Number(response?.data?.limits?.sheduler_limit?.total ?? 0),
        providersRemaining: Number(response?.data?.limits?.provider_limit?.rest ?? 0),
        providersLimit,
        hasProviderLimit: providersLimit > 0,
        getSubscriptionData: refetch,
        isLoading: isLoading,
        hasError: (error !== null),
    }
};

export default useSubscriptionData;
