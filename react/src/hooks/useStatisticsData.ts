import { useQuery } from "@tanstack/react-query";
import useOnboardingData from "./useOnboardingData";
import { SubscriptionData } from "../types/SubscriptionData";
import request from "../api/requests/request";

const useStatisticsData = () => {
    const { onboardingCompleted } = useOnboardingData();

    const query = useQuery<SubscriptionData>({
        queryKey: ["subscription_data"],
        queryFn: async () => {
            if (!onboardingCompleted) {
                return {} as SubscriptionData;
            }

            let response = await request('subscription_data');
            if (response == null) {
                console.error('subscription_data error', response);
                return {} as SubscriptionData;
            }

            return response;
        },
        staleTime: 1000 * 60 * 60,
        retry: 0,
        enabled: !!onboardingCompleted,
    });

    const isLoading = query.isLoading;

    return {
        subscription: query.data?.data,
        subscriptionPlan: query.data?.data?.subscription_name,
        expiresIn: query.data?.data?.expires_in,
        isExpired: query.data?.data?.is_expired,
        smsRemaining: query.data?.data?.limits?.sms_limits?.rest,
        smsTotal: query.data?.data?.limits?.sms_limits?.total,
        bookingsRemaining: query.data?.data?.limits?.sheduler_limit?.rest,
        bookingsTotal: query.data?.data?.limits?.sheduler_limit?.total,
        providersRemaining: query.data?.data?.limits?.provider_limit?.rest,
        providersTotal: query.data?.data?.limits?.provider_limit?.total,
        isLoading: isLoading,
    }
};

export default useStatisticsData;