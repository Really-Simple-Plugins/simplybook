import request from "../requests/request";

/**
 * Get settings fields (with or without values)
 * @param withValues
 * @return {Promise<void>}
 */
const getSettingsFields = async ({ withValues = true }) => {
  const res = await request("settings/get_fields", "POST", { withValues });

  return res.data;
};

export default getSettingsFields;
