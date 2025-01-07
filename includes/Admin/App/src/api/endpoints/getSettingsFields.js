import request from "../requests/request";

/**
 * Get settings fields (with or without values)
 * @param withValues
 * @return {Promise<void>}
 */
const getSettingsFields = async ({ withValues = true }) => {
  const res = await request("settings/get", "POST", { withValues });
  console.log("getSettingsFields from api ", res);

  return res.data;
};

export default getSettingsFields;
