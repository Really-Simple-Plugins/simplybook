import request from "../../requests/request";

/**
 * Update an onboarding step
 * @param withValues
 * @return {Promise<void>}
 */
const registerEmail = async ({ data = true }) => {
    console.log("calling registerEmail api", data);
    const res = await request("onboarding/register_email", "POST", { data });
    return res.data;
};

export default registerEmail;