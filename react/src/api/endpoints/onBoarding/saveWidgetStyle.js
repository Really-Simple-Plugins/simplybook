import request from "../../requests/request";

/**
 * Update an onboarding step
 * @param withValues
 * @return {Promise<void>}
 */
const saveWidgetStyle = async ({primary_color = '', secondary_color = '', active_color = '',}) => {
    return await request("onboarding/save_widget_style", "POST", {
        primary_color,
        secondary_color,
        active_color,
    });
};

export default saveWidgetStyle;