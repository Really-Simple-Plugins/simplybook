import request from "../../requests/request";

/**
 * Update an onboarding step
 * @param data
 * @return {Promise<void>}
 */
const generatePages = async ({ data = true }) => {

    return await request("onboarding/generate_pages", "POST", { data });
};

export default generatePages;