import request from "../requests/request";

/**
 * Update an onboarding step
 * @return {Promise<array>}
 */
const getProviders = async () => {
    const res = await request("providers", "POST");
    if (!res || !res.data) {
        console.log("no Providers found")
        return [];
    }
    console.log("getProviders response ", res);
    return res.data;
};

export default getProviders;