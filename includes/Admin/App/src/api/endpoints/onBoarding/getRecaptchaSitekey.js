import request from "../../requests/request";

/**
 * Update an onboarding step
 * @return {Promise<void>}
 */
const getRecaptchaSiteKey = async () => {
    const res = await request("onboarding/get_recaptcha_sitekey", "POST");
    console.log("getRecaptchaSiteKey", res);
    return res.data.site_key;
};

export default getRecaptchaSiteKey;