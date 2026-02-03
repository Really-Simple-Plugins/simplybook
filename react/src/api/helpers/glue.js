// src/api/helpers/glue.js
import { SIMPLYBOOK_SITE_URL } from "../config";

const usesPlainPermalinks = () => SIMPLYBOOK_SITE_URL.includes("?");
const glue = () => (usesPlainPermalinks() ? "&" : "?");

export default glue;
