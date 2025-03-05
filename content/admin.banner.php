<?php
if ( ! defined( 'ABSPATH' ) ) exit;

if(!class_exists('SimplybookMePl_AdminBannerPage')) {
    class SimplybookMePl_AdminBannerPage extends SimplybookMePl_AdminCommon
    {

        public function __construct($twig)
        {
            parent::__construct($twig);

            $this->initScripts();
        }

        protected function initScripts()
        {
            wp_register_style('simplybookMePl_admin_banner_styles', plugins_url(SimplybookMePl_PLUGIN_NAME . '/content/css/simplybook.banner.css'));
            wp_enqueue_style('simplybookMePl_admin_banner_styles');
        }

        public function render($page)
        {
            $screen = get_current_screen();
            $allowedScreens = array('dashboard');

            if (!in_array($screen->base, $allowedScreens)) {
                return;
            }

            $this->_checkActionCall();

            $data = array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'login_url' => $this->auth->getAuthUrl(),
                'api_url' => $this->auth->getApiURL(false) . 'public',
                'is_auth' => $this->auth->isAuthorized(),
                'auth_data' => $this->auth->getAuthData(),
                '_wpnonce' => SimplybookMePl_NonceProtect::getNonce(),
                'not_auth_message' => __('Sign up to start accepting online bookings, issue invoices, and SUPERCHARGE your business—all from your WordPress site.', 'simplybook'),
                'not_auth_header' => __('Start Managing Your Bookings Today!', 'simplybook'),
                'button_1_text' => __('Sign Up Now for FREE', 'simplybook'),
                'button_2_text' => __('Dismiss', 'simplybook'),
                'dismiss_confirm' => __('Are you sure you want to dismiss the banner?', 'simplybook'),
                'error' => $this->error,
                'message' => $this->message,
            );


           // echo $this->twig->render('admin.main.twig', $data);
            /**
             * Note to reviewer:
             * In this case, I use wp_kses, but additionally I have to use str_replace, because your function contains a bug, and breaks the parameters that are in the urls.
             * Example: http://www.youtube.com/watch?v=nTDNLUzjkpg&hd=1 after wp_kses will be http://www.youtube.com/watch?v=nTDNLUzjkpg&amp;hd=1
             * Accordingly, if this url is contained in an html element or in javascript, it automatically becomes non-working.
             * I want to note that you have an open ticket for this (already 14 years old). And it is not resolved.
             *  https://core.trac.wordpress.org/ticket/11311
             */
            echo str_replace('%amp%', '&', wp_kses($this->twig->render('admin.banner.twig', $data), simplybookMePl_getAllowedHtmlEntities()));
        }
    }
}