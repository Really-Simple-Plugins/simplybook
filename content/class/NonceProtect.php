<?php
if ( ! defined( 'ABSPATH' ) ) exit;


if (!class_exists('SimplybookMePl_NonceProtect')) {
    class SimplybookMePl_NonceProtect
    {

        private static $_nonce = null;
        private static $_pass = '7*sdafd4rfsd34dsf#JT6';


        public static function getNonce(){
            if (self::$_nonce === null) {
                self::$_nonce = self::_generateNonce();
            }

            return self::$_nonce;
        }

        private static function _generateNonce(){
            return wp_create_nonce( self::$_pass);
        }

        public static function isNonceValid($nonce){
            return wp_verify_nonce($nonce, self::$_pass);
        }

        public static function checkNonce(){
            $nonce = sanitize_text_field($_REQUEST['_wpnonce']);

            if(!$nonce && isset($_REQUEST['formData'])){
                $nonce = sanitize_text_field($_REQUEST['formData']['_wpnonce']);
            }

            if (!$nonce || !self::isNonceValid($nonce)) {
                throw new SimplybookMePl_Exception('Invalid nonce');
            }

            return true;
        }

    }
}