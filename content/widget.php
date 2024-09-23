<?php

if ( ! defined( 'ABSPATH' ) ) exit;

include_once SimplybookMePl_PLUGIN_DIR . 'vendor/autoload.php';
include_once SimplybookMePl_PLUGIN_DIR . 'content/class/Exception.php';
include_once SimplybookMePl_PLUGIN_DIR . 'content/class/NonceProtect.php';
include_once SimplybookMePl_PLUGIN_DIR . 'content/class/global.functions.php';
include_once SimplybookMePl_PLUGIN_DIR . 'content/class/Api.php';


function simplybookMePl_Widget($atts = array()){
    $twig = simplybookMePl_initTwig();
    $auth = new SimplybookMePl_Api();

    $data = array(
        'is_auth' => $auth->isAuthorized(),
        'auth_data' => $auth->getAuthData(),
        '_wpnonce' => SimplybookMePl_NonceProtect::getNonce(),
    );

    $widgetSettings = simplybookMePl_getConfig('widget_settings');
    if(!$widgetSettings){
        $widgetSettings = array();
    }

    $postSettings = array();
    if(isset($_POST['formData'])) {
        //NONCE PROTECT to prevent unauthorized access. THIS CODE USE wp_create_nonce() and wp_verify_nonce() functions
        SimplybookMePl_NonceProtect::checkNonce();

        $postSettings = array_map('sanitize_text_field', $_POST['formData']);
        if(isset($_POST['formData']['themeparams'])) {
            $postSettings['themeparams'] =  array_map('sanitize_text_field', $_POST['formData']['themeparams']);
        }
        if(isset($_POST['formData']['predefined'])) {
            $postSettings['predefined'] =  array_map('sanitize_text_field', $_POST['formData']['predefined']);
        }
    }

    //check if attributes are set
    if(count($atts)){
        $atts = array_map('sanitize_text_field', $atts);
        $predefinedAttsKeys = array('location', 'category', 'provider', 'service');
        //create new array with predefined attributes from $atts
        $predefinedAtts = array();
        foreach ($predefinedAttsKeys as $key) {
            if(isset($atts[$key])){
                $predefinedAtts[$key] = $atts[$key];
            }
        }
        if(!isset($postSettings['predefined'])){
            $postSettings['predefined'] = array();
        }
        $postSettings['predefined'] = array_merge(!is_array($postSettings['predefined']) ? array() : $postSettings['predefined'], $predefinedAtts);
    }

    unset($postSettings['_wpnonce']);
    unset($postSettings['submit']);

    if(!$postSettings){
        $postSettings = array();
    }

    $widgetSettings = array_merge($widgetSettings, $postSettings);

    if($widgetSettings) {
        foreach ($widgetSettings as $key => $value) {
            $data[$key] = $value;
        }
    }

    $script = str_replace(array("<script>", "</script>"), '', $twig->render('widget.twig', $data));

    return $script;
}


