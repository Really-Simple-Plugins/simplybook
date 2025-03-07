import request from "../../requests/request";
import { DashboardData } from "../../../types/DashboardData";

/**
 * Get the bookings count
 * @return {Promise<getDashboardData>}
 */
const getDashboardData = async (): Promise<DashboardData> => {

    const response = await request("get_dashboard_data", "POST");
    console.log("getDashboardData response", response);

    // @ts-ignore
    if (!response || !response.data) {
        const defaultData: DashboardData = {
            bookings_count_month: 0,
            bookings_count_day: 0,
            most_popular_provider: { name: '', percentage: 0 },
            most_popular_service: { name: '', percentage: 0 }
        };
        return defaultData;
    }

    // @ts-ignore
    const data = response.data as Partial<DashboardData>;

    const dashboardData: DashboardData = {
        bookings_count_month: data.bookings_count_month ?? 0,
        bookings_count_day: data.bookings_count_day ?? 0,
        most_popular_provider: data.most_popular_provider ?? { name: '', percentage: 0 },
        most_popular_service: data.most_popular_service ?? { name: '', percentage: 0 }
    };

    return dashboardData;
};

export default getDashboardData;
