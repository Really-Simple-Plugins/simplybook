export interface StatisticsData {
    data: {
        id: number | null;
        most_popular_provider_bookings: number;
        most_popular_service_bookings: number;
        bookings_today: number;
        bookings_this_week: number;
        bookings_this_month: number | null | undefined;
        most_popular_provider: {
            id: number | null;
            name: string;
            is_active: boolean;
            is_visible: boolean;
            [key: string]: any; // Allow additional properties
        },
        most_popular_service: {
            id: number | null;
            name: string;
            is_active: boolean;
            is_visible: boolean;
            [key: string]: any; // Allow additional properties
        }
        [key: string]: any; // Allow additional properties
    }
}