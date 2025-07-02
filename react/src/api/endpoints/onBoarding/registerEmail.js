import request from "../../requests/request";

/**
 * Update an onboarding step
 * @param withValues
 * @return {Promise<void>}
 */
const registerEmail = async ({ data = true }) => {
    return await request("onboarding/register_email", "POST", { data });
};

export default registerEmail;