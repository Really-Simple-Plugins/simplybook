export interface SubscriptionData {
    data: {
        subscription_name: string;
        expire_in: number;
        is_expired: boolean;
        limits: {
            sms_limit: {
                rest: number | string;
                total: number | string;
            };
            sheduler_limit: { // Typo intended, its misspelled in the API
                rest: number | string;
                total: number | string;
            };
            provider_limit: {
                rest: number | string;
                total: number | string;
            };
        };
    }
}
