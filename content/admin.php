<?php

if ( ! defined( 'ABSPATH' ) ) exit;

include SimplybookMePl_PLUGIN_DIR . 'vendor/autoload.php';
include_once SimplybookMePl_PLUGIN_DIR . 'content/class/Exception.php';
include SimplybookMePl_PLUGIN_DIR . 'content/class/NonceProtect.php';
include SimplybookMePl_PLUGIN_DIR . 'content/class/global.functions.php';
include SimplybookMePl_PLUGIN_DIR . 'content/class/Api.php';

$twig = simplybookMePl_initTwig();
$nonLoginPages = array('auth', 'register', 'check');
$page = isset($_GET['sbpage']) ? sanitize_text_field($_GET['sbpage']) : 'main';


$auth = new SimplybookMePl_Api();
$isAuthorized = $auth->isAuthorized();

if(!$isAuthorized && !in_array($page, $nonLoginPages)){
    $page = 'auth';
}

$messages = simplybookMePl_getFlashMessages();
$messSucc = array();
$messErr = array();

foreach ($messages as $message) {
    if($message['type'] == 'error'){
        $messErr[] = $message['message'];
    }else{
        $messSucc[] = $message['message'];
    }
}

$twig->addGlobal('flash', array(
    'errors' => $messErr,
    'messages' => $messSucc,
));

if(!current_user_can( 'edit_posts' )){
    echo wp_kses_post("<div class='error'><p>" . __('You do not have sufficient permissions to access this page.', 'simplybook') . "</p></div>");
} else {

    include_once SimplybookMePl_PLUGIN_DIR . 'content/admin.common.php';

    switch ($page) {
        case 'auth':
            include_once SimplybookMePl_PLUGIN_DIR . 'content/admin.auth.php';
            $cPage = new SimplybookMePl_AdminAuthPage($twig);
            break;

        case 'register':
            wp_register_script('simplybookMePl_admin_reg_script', plugins_url(SimplybookMePl_PLUGIN_NAME . '/content/js/registration.js'), array(), '1.0.0');
            wp_enqueue_script('simplybookMePl_admin_reg_script');

            include_once SimplybookMePl_PLUGIN_DIR . 'content/admin.register.php';
            $cPage = new SimplybookMePl_AdminRegisterPage($twig);
            break;

        case 'main':
            include_once SimplybookMePl_PLUGIN_DIR . 'content/admin.main.php';
            $cPage = new SimplybookMePl_AdminMainPage($twig);
            break;

        case 'check':
            include_once SimplybookMePl_PLUGIN_DIR . 'content/admin.check.php';
            $cPage = new SimplybookMePl_AdminCheckPage($twig);
            break;


        case 'sbredirect':
            include_once SimplybookMePl_PLUGIN_DIR . 'content/admin.sbredirect.php';
            $cPage = new SimplybookMePl_AdminSbRedirectPage($twig);
            break;
    }

    if ($cPage) {
        try {
            $cPage->render($page);
        } catch (SimplybookMePl_Exception $e) {
            echo wp_kses_post("<div class='error'><p>" . $e->getMessage() . "</p></div>");
        } catch (Exception $e) {
            echo wp_kses_post("<div class='error'><p>" . $e->getMessage() . "</p></div>");
        }
    }

    wp_register_style('simplybookMePl_admin_styles', plugins_url(SimplybookMePl_PLUGIN_NAME . '/content/css/simplybook.admin.css'));
    wp_enqueue_style('simplybookMePl_admin_styles');
    //To preview widget
    wp_register_script('simplybookMePl_widget_scripts', 'https://simplybook.me/v2/widget/widget.js', array(), '1.3.0');
    wp_enqueue_script('simplybookMePl_widget_scripts');

    wp_enqueue_style( 'font-awesome', 'https://use.fontawesome.com/releases/v6.6.0/css/all.css' );


    simplybookMePl_js_load_custom_translation();
}