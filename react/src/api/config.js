// src/api/config.js

// Token for authenticated requests; fix to get the SimplyBook nonce
export const NONCE = simplybook.nonce;
export const X_WP_NONCE = simplybook.x_wp_nonce;

// Base URL for SimplyBook API requests
export const API_BASE_PATH = simplybook.rest_namespace + "/" + simplybook.rest_version + "/";
export const SB_API_URL = simplybook.rest_url + simplybook.rest_namespace + "/" + simplybook.rest_version + "/";

// URLs for the site and AJAX endpoint
export const SITE_URL = getSiteUrl("rest_url");
export const AJAX_URL = getSiteUrl("ajax_url");

// Text domain for SimplyBook translations
export const TEXT_DOMAIN = "simplybook";

// Handy constants
export const SIMPLYBOOK_DOMAINS = simplybook.simplybook_domains;
export const OTHER_DOMAIN_VALUE = "Other";

/**
 * Retrieves the specified URL ('site_url' or 'admin_ajax_url') from burst_settings.
 * If the site is loaded over HTTPS, enforces HTTPS for the URL to prevent mixed content issues.
 * @param {string} type - 'site_url' or 'admin_ajax_url'.
 * @returns {string} The requested URL with HTTPS enforced if necessary.
 */
function getSiteUrl(type) {
  // Retrieve URL from burst_settings based on type
  let url = simplybook[type];

  // If the page is loaded over HTTPS and the URL is not, update it to HTTPS
  if (window.location.protocol === "https:" && !url.includes("https://")) {
    url = url.replace("http://", "https://");
  }

  return url;
}