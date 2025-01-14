import request from "../../requests/request";

/**
 * Update an onboarding step
 * @param data
 * @return {Promise<void>}
 */
const isPageTitleAvailable = async ({ data = true }) => {
    return await request("onboarding/is_page_title_available", "POST", { data });
};

export default isPageTitleAvailable;