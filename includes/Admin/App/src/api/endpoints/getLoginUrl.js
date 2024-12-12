import request from "../requests/request";

/**
 * Update an onboarding step
 * @return {Promise<string>}
 */
const getLoginUrl = async () => {
    const res = await request("get_login_url", "POST");
    if (!res || !res.data.url) {
        return {
            'url':'',
            'login_url':''
        };
    }
    return res.data;
};

export default getLoginUrl;