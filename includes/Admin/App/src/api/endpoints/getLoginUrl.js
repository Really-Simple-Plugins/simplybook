import request from "../requests/request";

/**
 * Update an onboarding step
 * @return {Promise<string>}
 */
const getLoginUrl = async (type) => {
    const res = await request("get_login_url", "POST");
    if (!res || !res.data.url) {
        console.log("no login url found")
        return '';
    }
    console.log("get login url response ", res);
    // res.data.url if type === 'url', res.data.login_url if type = 'login_url'
    return type === 'url' ? res.data.url : res.data.login_url;
};

export default getLoginUrl;