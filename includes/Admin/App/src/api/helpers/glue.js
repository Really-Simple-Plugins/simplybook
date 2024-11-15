// src/api/helpers/glue.js
import { SITE_URL } from "../config";

const usesPlainPermalinks = () => SITE_URL.includes("?");
const glue = () => (usesPlainPermalinks() ? "&" : "?");

export default glue;
