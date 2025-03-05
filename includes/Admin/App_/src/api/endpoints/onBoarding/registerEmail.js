import request from "../../requests/request";

/**
 * Update an onboarding step
 * @param withValues
 * @return {Promise<void>}
 */
const registerEmail = async ({ data = true }) => {
    console.log("calling registerEmail api", data);
    return await request("onboarding/register_email", "POST", { data });
};

export default registerEmail;