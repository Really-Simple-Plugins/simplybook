import request from "../requests/request";

/**
 * Update an onboarding step
 * @return {Promise<string>}
 */
const getWidget = async () => {
    console.log("loading widget");
    const res = await request("get_widget", "POST");
    console.log(res);
    if (!res || !res.data.widget ) {
        return {
            'widget':'',
        };
    }
    return res.data.widget;
};

export default getWidget;