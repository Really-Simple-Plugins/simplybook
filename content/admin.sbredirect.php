<?php
if ( ! defined( 'ABSPATH' ) ) exit;

if (!class_exists('SimplybookMePl_AdminSbredirectPage')) {
    class SimplybookMePl_AdminSbredirectPage
    {

        protected $_error = null;
        protected $_message = null;

        protected $auth = null;

        protected $twig = null;


        public function __construct($twig)
        {
            $this->auth = new SimplybookMePl_Api();
            $this->twig = $twig;

            $isAuthorized = $this->auth->isAuthorized();

            if (!$isAuthorized) {
                simplybookMePl_redirectToAdminPage('main');
            }
        }

        public function render(){
            $sbUrl = isset($_REQUEST['sburl']) ? sanitize_text_field($_REQUEST['sburl']) : null;

            //check nonce
            try {
                SimplybookMePl_NonceProtect::checkNonce();
            } catch (SimplybookMePl_Exception $e) {
                simplybookMePl_addFlashMessage(__('Invalid nonce', 'simplybook'), 'error');
                simplybookMePl_redirectToAdminPage('main');
                return;
            }

            if(!$sbUrl){
                simplybookMePl_addFlashMessage(__('Incorrect redirect url', 'simplybook'), 'error');
                simplybookMePl_redirectToAdminPage('main');
                return;
            }

            $authHashData = $this->auth->getAuthHashData();

            if(!$authHashData || !isset($authHashData['hash'])){
//                simplybookMePl_addFlashMessage(__('Invalid Simplybook API call. Perhaps you changed your password, or for some reason your session has expired. Please, try to re-login.', 'simplybook'), 'error');
//                simplybookMePl_redirectToAdminPage('main');
//                return;

                //$lastError = $this->auth->getLastError();

                $loginUrl = $this->auth->getAdminUrl() . $sbUrl . '?' . http_build_query(array(
                    'back_url' => $sbUrl,
                ));
            } else {
                $loginUrl = $authHashData['login_url'] . '?' . http_build_query(array(
                    'back_url' => $sbUrl,
                ));
            }


            wp_redirect($loginUrl);

            $data = array(
                'error' => $this->_error,
                'redirect_url' => $loginUrl,
                'is_auth' => $this->auth->isAuthorized(),
                '_wpnonce' => SimplybookMePl_NonceProtect::getNonce(),
            );

            echo str_replace('%amp%', '&', wp_kses($this->twig->render('admin.redirect.twig', $data), simplybookMePl_getAllowedHtmlEntities()));
        }

    }
}