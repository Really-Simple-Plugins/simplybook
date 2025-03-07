import request from "../requests/request";

/**
 * Update an onboarding step
 * @return {Promise<array>}
 */
const getServices = async () => {
    const res = await request("services", "POST");
    if (!res || !res.data) {
        console.log("no services found")
        return [];
    }
    console.log("getServices response ", res);
    return res.data;
};

export default getServices;