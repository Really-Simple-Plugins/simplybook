import request from "../requests/request";
import {LoginData} from "../../types/LoginData";
/**
 * Update an onboarding step
 * @return {Promise<LoginData>}
 */
const getLoginUrl = async () => {
    const res = await request("get_login_url", "POST");
    if (!res || !res.data.url) {
        return {
            'url':'',
            'login_url':'',
            'domain':'',
        };
    }
    return res.data;
};

export default getLoginUrl;