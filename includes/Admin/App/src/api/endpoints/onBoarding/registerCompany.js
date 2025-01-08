import request from "../../requests/request";

/**
 * Update an onboarding step
 * @param withValues
 * @return {Promise<void>}
 */
const registerCompany = async ({ data = true }) => {
    console.log("calling registerCompany api", data);
    return await request("onboarding/company_registration", "POST", { data });
};

export default registerCompany;