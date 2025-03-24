export interface StatisticsData {
    data: {
        subscription_name: string;
        expires_in: string;
        is_expired: boolean;
        limits: {
            sms_limits: {
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