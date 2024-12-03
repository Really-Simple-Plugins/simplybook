import request from "../../requests/request";

/**
 * Update an onboarding step
 * @param withValues
 * @return {Promise<void>}
 */
const confirmEmail = async ({ data = true }) => {
    console.log("calling confirmEmail api", data);
    const res = await request("onboarding/confirm_email", "POST", { data });
    console.log("confirmEmail response", res);
    return res.data;
};

export default confirmEmail;