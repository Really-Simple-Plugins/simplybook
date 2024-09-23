<?php
if ( ! defined( 'ABSPATH' ) ) exit;

if(!class_exists('SimplybookMePl_AdminCommon')) {
    class SimplybookMePl_AdminCommon
    {
        public function __construct($twig)
        {
            $this->twig = $twig;
            $this->auth = new SimplybookMePl_Api();
            $this->error = null;
            $this->message = null;
        }


        protected function _checkActionCall()
        {
            //var_dump($_REQUEST); die;
            if (isset($_REQUEST['m']) && $_REQUEST['m']) {
                $method = sanitize_text_field($_REQUEST['m']);
                $res = true;
                //replace - to uppercase next letter
                $methodData = explode('-', $method);
                $method = $methodData[0] . implode('', array_map('ucfirst', array_slice($methodData, 1)));

                if ($method && method_exists($this, $method.'Action')) {
                    $res = $this->{$method.'Action'}();
                }
                if (!$res) {
                    return;
                }
            }
        }
    }
}