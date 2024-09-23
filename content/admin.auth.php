<?php
if ( ! defined( 'ABSPATH' ) ) exit;

if (!class_exists('SimplybookMePl_AdminAuthPage')) {
    class SimplybookMePl_AdminAuthPage extends SimplybookMePl_AdminCommon
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

        protected function confirmAction()
        {
            //NONCE PROTECT to prevent unauthorized access. THIS CODE USE wp_create_nonce() and wp_verify_nonce() functions
            SimplybookMePl_NonceProtect::checkNonce();
            $confirmCode = isset($_REQUEST['verification_code']) ? sanitize_text_field($_REQUEST['verification_code']) : null;
            $sessionId = isset($_REQUEST['session_id']) ? sanitize_text_field($_REQUEST['session_id']) : null;
            $code = isset($_REQUEST['code']) ? sanitize_text_field($_REQUEST['code']) : null;
            $companyLogin = isset($_REQUEST['company_login']) ? sanitize_text_field($_REQUEST['company_login']) : null;

            if(!$companyLogin && isset($_REQUEST['company'])){
                $companyLogin = sanitize_text_field($_REQUEST['company']);
            }

            if(!$sessionId){
                $sessionId = isset($_REQUEST['s']) ? sanitize_text_field($_REQUEST['s']) : null;
            }

            if ($confirmCode && $sessionId && $code && $companyLogin) {
                $isSuccess = $this->auth->confirm($companyLogin, $code, $confirmCode, $sessionId);
                if ($isSuccess) {
                    simplybookMePl_addFlashMessage(__('You have been successfully logged in', 'simplybook'), 'message');
                    simplybookMePl_redirectToAdminPage('main', array(
                        'sbloginsucc' => 1,
                    ));
                    return false;
                } else {
                    $this->_error = __('Incorrect code', 'simplybook');
                    return true;
                }
            } else if($confirmCode && $sessionId && $code){
                $this->_error = __('Incorrect company login', 'simplybook');
                return true;
            } else if($confirmCode && $sessionId){
                $this->_error = __('Incorrect code', 'simplybook');
                return true;
            } else if($confirmCode){
                $this->_error = __('Incorrect session', 'simplybook');
                return true;
            }
            return true;
        }

        protected function setserverAction()
        {
            //NONCE PROTECT to prevent unauthorized access. THIS CODE USE wp_create_nonce() and wp_verify_nonce() functions
            SimplybookMePl_NonceProtect::checkNonce();
            $domain = isset($_POST['domain']) ? sanitize_text_field($_POST['domain']) : null;

            if ($domain) {
                $isSuccess = $this->auth->setDomain($domain);
                if ($isSuccess) {
                    simplybookMePl_redirectToAdminPage('auth');
                    return false;
                } else {
                    $this->_error = __('Incorrect domain', 'simplybook');
                    return true;
                }
            }
            return false;
        }

        public function render(){
            $this->_checkActionCall();

            $code = isset($_REQUEST['code']) ? sanitize_text_field($_REQUEST['code']) : null;
            $sessionId = isset($_REQUEST['session_id']) ? sanitize_text_field($_REQUEST['session_id']) : null;
            $companyLogin = isset($_REQUEST['company']) ? sanitize_text_field($_REQUEST['company']) :
                (isset($_REQUEST['company_login']) ? sanitize_text_field($_REQUEST['company_login']) : null);
            $domain = isset($_REQUEST['domain']) ? sanitize_text_field($_REQUEST['domain']) : null;
            $verificationCode = isset($_REQUEST['verification_code']) ? sanitize_text_field($_REQUEST['verification_code']) : null;

            if(!$sessionId){
                $sessionId = isset($_REQUEST['s']) ? sanitize_text_field($_REQUEST['s']) : null;
            }

            $data = array(
                'error' => $this->_error,
                'message' => $this->_message,
                'code' => $code,
                'session_id' => $sessionId,
                'company_login' => $companyLogin,
                'domain' => $domain,
                'verification_code' => $verificationCode,
                'api_domain' => $this->auth->getDomain(),
                'login_url' => $this->auth->getAuthUrl(),
                //'register_url' => $this->auth->getMainSiteUrl() . "/default/registration/?ref=wpplugin",
                'register_url' => simplybookMePl_makeUrl('register'),
                'is_auth' => $this->auth->isAuthorized(),
                '_wpnonce' => SimplybookMePl_NonceProtect::getNonce(),
            );

            //echo $this->twig->render('admin.auth.twig', $data);
            /**
             * Note to reviewer:
             * In this case, I use wp_kses, but additionally I have to use str_replace, because your function contains a bug, and breaks the parameters that are in the urls.
             * Example: http://www.youtube.com/watch?v=nTDNLUzjkpg&hd=1 after wp_kses will be http://www.youtube.com/watch?v=nTDNLUzjkpg&amp;hd=1
             * Accordingly, if this url is contained in an html element or in javascript, it automatically becomes non-working.
             * I want to note that you have an open ticket for this (already 14 years old). And it is not resolved.
             *  https://core.trac.wordpress.org/ticket/11311
             */
            echo str_replace('%amp%', '&', wp_kses($this->twig->render('admin.auth.twig', $data), simplybookMePl_getAllowedHtmlEntities()));

        }

    }
}