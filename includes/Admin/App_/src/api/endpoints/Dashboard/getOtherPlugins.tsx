import request from "../../requests/request";
import {OtherPlugins} from "../../../types/OtherPlugins";

/**
 * Get the other plugins data
 * @return {Promise<Plugins>}
 */
const getOtherPlugins = async (): Promise<OtherPlugins> => {
    const response = await request("other_plugins_data", "POST");
    console.log("Other Plugins response", response);

    // @ts-ignore
    if (!response || !response.data) {
        return [];
    }

    // @ts-ignore
    return response.data.plugins as OtherPlugins;
};

export default getOtherPlugins;
