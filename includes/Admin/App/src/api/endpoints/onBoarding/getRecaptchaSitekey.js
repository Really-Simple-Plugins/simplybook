import request from "../../requests/request";

/**
 * Update an onboarding step
 * @return {Promise<void>}
 */
const getRecaptchaSiteKey = async () => {
    console.log("calling recaptcha sitekey api");
    const res = await request("onboarding/get_recaptcha_sitekey", "GET");
    console.log(res);
    return res.data.site_key;
};

export default getRecaptchaSiteKey;