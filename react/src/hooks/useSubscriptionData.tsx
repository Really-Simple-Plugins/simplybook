import { useQuery } from "@tanstack/react-query";
import useOnboardingData from "./useOnboardingData";
import { SubscriptionData } from "../types/SubscriptionData";
import HttpClient from "../api/requests/HttpClient";
import {useNotifications} from "../context/NotificationContext";

const useSubscriptionData = () => {
    const { onboardingCompleted } = useOnboardingData();
    const { triggerNotificationById } = useNotifications();

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

    if (response?.data?.limits?.provider_limit?.rest === 0) {
        triggerNotificationById('maxed_out_providers');
    }

    return {
        subscription: response?.data,
        subscriptionPlan: (response?.data?.subscription_name ?? ''),
        expiresIn: (response?.data?.expire_in ?? 0),
        isExpired:(response?.data?.is_expired ?? false),
        smsRemaining: (response?.data?.limits?.sms_limit?.rest ?? 0),
        smsTotal: (response?.data?.limits?.sms_limit?.total ?? 0),
        bookingsRemaining: (response?.data?.limits?.sheduler_limit?.rest ?? 0),
        bookingsTotal: (response?.data?.limits?.sheduler_limit?.total ?? 0),
        providersRemaining: (response?.data?.limits?.provider_limit?.rest ?? 0),
        providersTotal: (response?.data?.limits?.provider_limit?.total ?? 0),
        getSubscriptionData: refetch,
        isLoading: isLoading,
        hasError: (error !== null),
    }
};

export default useSubscriptionData;