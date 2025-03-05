export interface DashboardData {
    bookings_count_month: number;
    bookings_count_day: number;
    most_popular_provider: {'name': string, 'percentage': number};
    most_popular_service: {'name': string, 'percentage': number};
}