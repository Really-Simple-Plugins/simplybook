/**
 * RTL Helper
 *
 * Simple helper function to check if RTL mode is enabled.
 * Used for JavaScript logic that needs to know the text direction
 * (e.g., ToastContainer position).
 *
 * Note: For CSS/Tailwind, RTL is handled automatically via:
 * - The `dir="rtl"` attribute set on #simplybook_app (see index.js)
 * - Tailwind's `rtl:` variant classes
 * - CSS logical properties (ms-*, me-*, start-*, end-*, etc.)
 */
export const getIsRtl = (): boolean => {
    return window.simplybook?.is_rtl ?? false;
};