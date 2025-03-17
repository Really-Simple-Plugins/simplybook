import request from "../requests/request";
import { LoginData } from "../../types/LoginData";
/**
 * Update an onboarding step
 * @return {Promise<LoginData>}
 */
const getLoginUrl = async () => {
  const res = await request("get_login_url", "POST");
  if (!res || !res.data.simplybook_dashboard_url) {
    return {
      simplybook_dashboard_url: "",
    };
  }
  return res.data;
};

export default getLoginUrl;