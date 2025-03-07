import request from "../requests/request";

/**
 * Update an onboarding step
 * @return {Promise<string>}
 */
const getWidget = async () => {
    const res = await request("get_widget", "POST");
    if (!res || !res.data.widget ) {
        return {
            'widget':'',
        };
    }
    return res.data.widget;
};

export default getWidget;