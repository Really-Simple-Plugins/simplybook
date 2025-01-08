import request from "../../requests/request";

/**
 * Update an onboarding step
 * @param withValues
 * @return {Promise<void>}
 */
const confirmEmail = async ({ data = true }) => {
    return await request("onboarding/confirm_email", "POST", { data });
};

export default confirmEmail;