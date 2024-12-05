import request from "../requests/request";

/**
 * Update an onboarding step
 * @return {Promise<void>}
 */
const getServices = async () => {
    const res = await request("services", "POST");
    if (!res || !res.data.services) {
        console.log("no services found")
        return [];
    }
    console.log("getServices response ", res);
    return res.data.services;
};

export default getServices;