import fetchRequest from "./fetchRequest";
import glue from "../helpers/glue";
import errorHandler from "../helpers/errorHandler";
import { API_BASE_PATH, NONCE } from "../config";

/**
 * Request function to make API calls. First try to make a request using the API Fetch function, if that fails, try AJAX.
 * @param path
 * @param method
 * @param data
 * @return {Promise<void>}
 * @deprecated use {@link HttpClient} instead
 */
const request = async (path, method = "POST", data = {}) => {
  const args = { path, method, data };


  args.path =
    API_BASE_PATH +
    args.path +
    glue() +
    "&token=" +
    Math.random().toString(36).substring(2, 7);
  args.data = { ...data, nonce: NONCE };
  if ( method === 'GET') {
    console.log("the request method is not adjusted for GET requests yet. ");
  }
  // if (method === 'POST') {
  //
  // } else {
  //   args.path += glue() + getNonce();
  // }

  try {
    // Try the fetch request first
    return await fetchRequest(args.path, args.method, args.data);
  } catch (fetchError) {
    // If fetch fails, log error with handler and try AJAX fallback
    errorHandler(fetchError, args.path);
  }
};

export default request;