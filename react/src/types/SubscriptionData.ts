export interface SubscriptionData {
    data: {
        subscription_name: string;
        expire_in: number;
        is_expired: boolean;
        limits: {
            sms_limit: {
                rest: number;
                total: number;
            };
            sheduler_limit: { // Typo intended, its misspelled in the API
                rest: number;
                total: number;
            };
            provider_limit: {
                rest: number;
                total: number;
            };
        };
    }
}