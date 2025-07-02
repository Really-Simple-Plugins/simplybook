import apiFetch from "@wordpress/api-fetch";

/**
 * Request function to make API calls. First try to make a request using the API Fetch function, if that fails, try AJAX.
 * @param path
 * @param method
 * @param data
 * @param url
 * @return {Promise<void>}
 */
const fetchRequest = async (path, method = "POST", data = {}, url) => {
  const args = { path, method, data };
  // resolve or reject
  return await apiFetch(args);
};

export default fetchRequest;