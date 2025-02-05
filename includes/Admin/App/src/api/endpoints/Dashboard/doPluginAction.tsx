import request from "../../requests/request";
import {OtherPlugin} from "../../../types/OtherPlugin";

/**
 * Get the other plugins data
 * @return {Promise<OtherPlugin>}
 */
const doPluginAction = async (slug:string, action:string ): Promise<OtherPlugin> => {
    const data = {
        slug: slug,
        action: action
    }
    const response = await request("do_plugin_action", "POST", data );
    console.log("actions Plugins response", response);

    // @ts-ignore
    if (!response || !response.data) {
        return {
            url: "#",
            title: "loading",
            action: "...",
            actionNiceName: "...",
            slug: "...",
        };
    }

    // @ts-ignore
    return response.data.plugin as OtherPlugin;
};

export default doPluginAction;
