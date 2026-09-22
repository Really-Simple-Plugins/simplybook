type SimplyBookDomain = {
    value: string;
    label: string;
};

type SimplyBookRecaptchaSettings = {
    site_key?: string;
    script_url?: string;
    google_privacy_policy_url?: string;
    google_terms_url?: string;
};

type SimplyBookSupportSettings = {
    enabled?: boolean;
    widget?: {
        url?: string;
    };
};

type SimplyBookThemeColors = {
    primary: string;
    secondary: string;
    active: string;
    background: string;
    foreground: string;
    text: string;
};

type SimplyBookGlobal = {
    nonce: string;
    x_wp_nonce: string;
    ajax_url: string;
    rest_url: string;
    rest_namespace: string;
    rest_version: string;
    site_url: string;
    dashboard_url: string;
    plans_prices_url?: string;
    default_route: string;
    assets_url: string;
    debug: boolean;
    json_translations: string[];
    settings_menu: unknown[];
    settings_fields: unknown[];
    is_onboarding_completed: boolean;
    first_name: string;
    user_email: string;
    completed_step: number | string;
    simplybook_domains: SimplyBookDomain[];
    simplybook_countries: unknown[];
    support?: SimplyBookSupportSettings;
    fallback_colors: SimplyBookThemeColors;
    recaptcha?: SimplyBookRecaptchaSettings;
};

type LiveAgentButton = {
    onClick?: () => void;
};

type LiveAgentGlobal = {
    createButton: (buttonId: string, script: HTMLScriptElement) => LiveAgentButton;
};

declare const simplybook: SimplyBookGlobal;

interface Window {
    simplybook?: SimplyBookGlobal;
    LiveAgent?: LiveAgentGlobal;
}
