import { setLocaleData } from "@wordpress/i18n";

/**
 * Load dynamic translation data for code-split React chunks.
 *
 * WordPress' wp_set_script_translations() only handles the main script.
 * This function manually loads translations for dynamically imported JS chunks.
 *
 * It reads the window.simplybook.json_translations array (injected by PHP)
 * and registers each translation with @wordpress/i18n.
 */
export function loadDynamicTranslations() {
    if (!window.simplybook?.json_translations) {
        return;
    }

    try {
        window.simplybook.json_translations.forEach((translationString) => {
            let translations = JSON.parse(translationString);
            let localeData = (translations.locale_data?.simplybook ?? translations.locale_data?.messages);

            if (!localeData) {
                return;
            }

            localeData[''].domain = 'simplybook';
            setLocaleData(localeData, 'simplybook');
        });
    } catch (e) {
        console.error("Failed to load dynamic translations:", e);
    }
}