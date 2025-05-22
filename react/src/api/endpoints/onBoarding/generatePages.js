import request from "../../requests/request";

/**
 * Update an onboarding step
 * @param payload
 * @return {Promise<void>}
 */
const generatePages = async ({ payload = true }) => {

    return await request("onboarding/generate_pages", "POST", { payload });
};

export default generatePages;