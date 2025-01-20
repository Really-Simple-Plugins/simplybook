import request from "../../requests/request";
import {Plugins} from "../../../types/Plugins";
/**
 * Get the bookings count
 * @return {Promise<Plugins>}
 */
const getPlugins = async (): Promise<Plugins> => {
    const response = await request("get_plugins", "POST");
    console.log("Plugins response", response);

    // @ts-ignore
    if (!response || !response.data) {
        return [];
    }

    // @ts-ignore
    return response.data as Task[];
};

export default getPlugins;
