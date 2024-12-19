import request from "../requests/request";

/**
 * Get settings fields (with or without values)
 * @param data
 * @return {Promise<void>}
 */
const saveSettingsFields = async ( data ) => {
    console.log("saving settings", data);
    const res = await request("settings/save", "POST", data);
    console.log("response from save settings ",res);
    return res.data;
};

export default saveSettingsFields;
