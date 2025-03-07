import request from "../requests/request";
import { LoginData } from "../../types/LoginData";
/**
 * Update an onboarding step
 * @return {Promise<LoginData>}
 */
const getLoginUrl = async () => {
  const res = await request("get_login_url", "POST");
  if (!res || !res.data.direct_url) {
    return {
      direct_url: "",
      login_url: "",
    };
  }
  return res.data;
};

export default getLoginUrl;