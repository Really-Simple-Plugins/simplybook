import request from "../../requests/request";

/**
 * Update an onboarding step
 */
const retryOnboarding = async () => {
    return await request("onboarding/retry_onboarding", "POST");
};

export default retryOnboarding;