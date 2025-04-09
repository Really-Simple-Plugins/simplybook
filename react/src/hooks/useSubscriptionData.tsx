import { useQuery } from "@tanstack/react-query";
import useOnboardingData from "./useOnboardingData";
import { SubscriptionData } from "../types/SubscriptionData";
import HttpClient from "../api/requests/HttpClient";

const useSubscriptionData = () => {
    const { onboardingCompleted } = useOnboardingData();

    const route = 'subscription_data';
    const client = new HttpClient(route);

    const {isLoading, error, data: response} = useQuery<SubscriptionData>({
        queryKey: [route],
        queryFn: () => client.get(),
        staleTime: 1000 * 60 * 60,
        retry: 0,
        enabled: !!onboardingCompleted,
    });

    if (error !== null) {
        console.error('Error fetching subscription data: ', error.message);
    }

    return {
        subscription: response?.data,
        subscriptionPlan: response?.data?.subscription_name,
        expiresIn: response?.data?.expire_in,
        isExpired: response?.data?.is_expired,
        smsRemaining: response?.data?.limits?.sms_limit?.rest,
        smsTotal: response?.data?.limits?.sms_limit?.total,
        bookingsRemaining: response?.data?.limits?.sheduler_limit?.rest,
        bookingsTotal: response?.data?.limits?.sheduler_limit?.total,
        providersRemaining: response?.data?.limits?.provider_limit?.rest,
        providersTotal: response?.data?.limits?.provider_limit?.total,
        isLoading: isLoading,
        hasError: (error !== null),
    }
};

export default useSubscriptionData;