import { SIMPLYBOOK_AJAX_URL } from "../config";

/**
 * Function to make an AJAX request to the server.
 * @param method
 * @param path
 * @param requestData
 * @return {Promise<any>}
 */
const ajaxRequest = async (path, method, requestData = {}) => {
  const url =
    "GET" === method
      ? SIMPLYBOOK_AJAX_URL + `&rest_action=${path.replace("?", "&")}`
      : SIMPLYBOOK_AJAX_URL;

  console.log(
    "AJAX: Requesting data from " + url + " using " + method + " method",
  );

  const options = {
    method,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  };

  const stripControls = (key, value) => {
    if (!key) {
      return value;
    }
    if (key && key.includes("Control")) {
      return undefined;
    }
    if ("object" === typeof value) {
      return JSON.parse(JSON.stringify(value, stripControls));
    }
    return value;
  };

  if ("POST" === method) {
    options.body = JSON.stringify({ path, data: requestData }, stripControls);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseData = await response.json();

    if (
      !responseData.data ||
      !responseData.data.hasOwnProperty("request_success")
    ) {
      throw new Error("Invalid data error");
    }

    delete responseData.data.request_success;

    // return promise with the data object
    return Promise.resolve(responseData.data);
  } catch (error) {
    return Promise.reject(new Error("AJAX request failed"));
  }
};

export default ajaxRequest;
