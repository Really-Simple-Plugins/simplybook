import request from "../../requests/request";

/**
 * Update an onboarding step
 * @param withValues
 * @return {Promise<void>}
 */
const registerTipsTricks = async ({ data = true }) => {
    console.log("calling registerTipsTricks api", data);
    const res = await request("onboarding/tipstricks", "POST", { data });
    return res.data;
};

export default registerTipsTricks;