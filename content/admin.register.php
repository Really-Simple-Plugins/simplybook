<?php
if ( ! defined( 'ABSPATH' ) ) exit;

if (!class_exists('SimplybookMePl_AdminRegisterPage')) {
    class SimplybookMePl_AdminRegisterPage extends SimplybookMePl_AdminCommon
    {

        protected $_error = null;
        protected $_message = null;

        protected $auth = null;
        protected $twig = null;


        public function __construct($twig)
        {
            parent::__construct($twig);

            $isAuthorized = $this->auth->isAuthorized();


            if ($isAuthorized) {
                simplybookMePl_redirectToAdminPage('main');
            }
        }

        public function render(){
            $this->_checkActionCall();

            $companyLogin = isset($_REQUEST['company']) ? sanitize_text_field($_REQUEST['company']) :
                (isset($_REQUEST['company_login']) ? sanitize_text_field($_REQUEST['company_login']) : null);
            $domain = isset($_REQUEST['domain']) ? sanitize_text_field($_REQUEST['domain']) : null;

            $currentUser = wp_get_current_user();

            $data = array(
                'error' => $this->_error,
                'company_login' => $companyLogin,
                'domain' => $domain,
                'api_domain' => $this->auth->getDomain(),
                'login_url' => $this->auth->getAuthUrl(),
                'callback_url' => $this->auth->getCallbackUrl(),
                'register_url' => $this->auth->getRegisterUrl(),
                'is_auth' => $this->auth->isAuthorized(),
                '_wpnonce' => SimplybookMePl_NonceProtect::getNonce(),

                //get some data from wordpress settings and user data

                'registration_data' => array(
                    'name' => get_option('blogname'),
                    'email' => $currentUser->user_email,
//                    'phone' => '',
//                    'country' => '',
//                    'city' => '',
//                    'address' => '',
//                    'zip' => '',
                    'user_login' => $currentUser->user_login,
                    'user_name' => $currentUser->display_name,
                )
            );

            echo str_replace('%amp%', '&', wp_kses($this->twig->render('admin.register.twig', $data), simplybookMePl_getAllowedHtmlEntities()));

        }

    }
}