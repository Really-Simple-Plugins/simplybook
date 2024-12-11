import request from "../requests/request";

/**
 * Update an onboarding step
 * @return {Promise<void>}
 */
const getLoginUrl = async () => {
    const res = await request("get_login_url", "POST");
    if (!res || !res.data.url) {
        console.log("no login url found")
        return [];
    }
    console.log("get login url response ", res);
    return res.data.url;
};

export default getLoginUrl;