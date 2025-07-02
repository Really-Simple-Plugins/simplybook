import request from "../../requests/request";

/**
 * Update an onboarding step
 * @return {Promise<void>}
 */
const getRecaptchaSiteKey = async (attempt=1) => {
    const res = await request("onboarding/get_recaptcha_sitekey", "POST");
    if (res.data.site_key === '' && attempt <= 5) {
        console.error("Recaptcha site key is empty, retry after 3 seconds, attempt ", attempt);
        await new Promise(resolve => setTimeout(resolve, 2000));
        return getRecaptchaSiteKey(attempt++);
    }

    return res.data.site_key;
};

export default getRecaptchaSiteKey;