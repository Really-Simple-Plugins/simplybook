import request from "../../requests/request";

/**
 * Update an onboarding step. Callback will verify if the page title is
 * available based on the URL within data.
 * @param data
 * @return {Promise<void>}
 */
const isPageTitleAvailable = async ({ data = true }) => {
  return await request("is_page_title_available", "POST", { data });
};

export default isPageTitleAvailable;