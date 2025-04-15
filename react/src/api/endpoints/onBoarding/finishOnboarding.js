import request from "../../requests/request";

/**
 * Update an onboarding step
 * @param data
 * @return {Promise<void>}
 */
const finishOnboarding = async ({ data = true }) => {

    return await request("onboarding/finish_onboarding", "POST", { data });
};

export default finishOnboarding;