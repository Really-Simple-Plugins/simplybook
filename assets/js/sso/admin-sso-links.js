/**
 * SimplyBook Admin SSO Links Handler
 *
 * Lightweight vanilla JS for handling SSO (Single Sign-On) links.
 * Fetches fresh login URLs on-click to ensure they're always valid.
 *
 * @since 3.2.1
 */
(function() {
    'use strict';

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        document.querySelectorAll('[data-sso-path]').forEach(function(link) {
            link.addEventListener('click', handleClick);
        });
    }

    function handleClick(e) {
        e.preventDefault();

        const link = e.currentTarget;
        const config = simplebookSSOConfig || {};
        const path = link.dataset.ssoPath;
        const originalText = link.textContent;
        const loadingText = link.dataset.loadingText;

        if (!config.restUrl || !config.nonce || !path) {
            return;
        }

        // Set loading state
        link.style.opacity = '0.6';
        link.style.pointerEvents = 'none';
        link.setAttribute('aria-busy', 'true');
        if (loadingText) {
            link.textContent = loadingText;
        }

        // Fetch and redirect
        fetch(config.restUrl + '?path=' + encodeURIComponent(path), {
            method: 'GET',
            headers: {
                'X-WP-Nonce': config.nonce
            },
            credentials: 'same-origin'
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data && data.data && data.data.simplybook_external_login_url) {
                window.location.href = data.data.simplybook_external_login_url;
            } else {
                restoreLink(link, originalText);
            }
        })
        .catch(function() {
            restoreLink(link, originalText);
        });
    }

    function restoreLink(link, originalText) {
        link.style.opacity = '1';
        link.style.pointerEvents = 'auto';
        link.removeAttribute('aria-busy');
        link.textContent = originalText;
    }

})();