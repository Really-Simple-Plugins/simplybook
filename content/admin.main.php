<?php
if ( ! defined( 'ABSPATH' ) ) exit;

if(!class_exists('SimplybookMePl_AdminMainPage')) {
    class SimplybookMePl_AdminMainPage extends SimplybookMePl_AdminCommon
    {

        public function __construct($twig)
        {
            parent::__construct($twig);

            $authData = $this->auth->getAuthData();

            if ($authData && isset($_REQUEST['token'])) {
                simplybookMePl_redirectToAdminPage('main');
            }

            $apiStatus = simplybookMePl_getConfig('api_status');
            if ($apiStatus && $apiStatus['status'] == 'error') {
                //can`t connect to API.
                simplybookMePl_addFlashMessage(__('We are currently unable to establish a connection with the API. It\'s possible that the company has disabled access to the API. Some settings may be outdated, but the widget will continue to function using previously saved data. To resolve this issue, please attempt to log in again.', 'simplybook'), 'error');
            }

            $this->initScripts();
        }

        protected function initScripts()
        {
            $isAuthorized = $this->auth->isAuthorized();

            if (!$isAuthorized) {
                return;
            }
            wp_register_script('sb_json_rpc', plugins_url(SimplybookMePl_PLUGIN_NAME . '/content/js/libs/json-rpc-client.js'), array(), '1.0.0');
            wp_register_script('jquery.base64', plugins_url(SimplybookMePl_PLUGIN_NAME . '/content/js/libs/jquery.base64.min.js'), array('jquery'), '1.0.0');
            wp_register_script('colpick', plugins_url(SimplybookMePl_PLUGIN_NAME . '/content/js/libs/alwan/js/alwan.min.js'), array('jquery'), '1.0.0');
            wp_register_script('simplybookMePl_admin_scripts', plugins_url(SimplybookMePl_PLUGIN_NAME . '/content/js/admin.js'), array('jquery', 'underscore', 'sb_json_rpc', 'colpick', 'wp-i18n', 'jquery.base64'), '1.0.0');
            wp_register_style('colpick', plugins_url(SimplybookMePl_PLUGIN_NAME . '/content/js/libs/alwan/css/alwan.min.css'));

            wp_set_script_translations('simplybookMePl_admin_scripts', 'simplybook', SimplybookMePl_PLUGIN_DIR . 'languages/');

            wp_enqueue_script('simplybookMePl_admin_scripts');
            wp_enqueue_style('colpick');
        }

        protected function logoutAction()
        {
            //NONCE PROTECT to prevent unauthorized access. THIS CODE USE wp_create_nonce() and wp_verify_nonce() functions
            SimplybookMePl_NonceProtect::checkNonce();
            $this->auth->logout();

            simplybookMePl_clearFlashMessages(); //clear other messages
            simplybookMePl_addFlashMessage(__("You have been logged out", 'simplybook'), 'message');
            simplybookMePl_redirectToAdminPage('auth');
            return false;
        }


        protected function settingsAction(){
            //NONCE PROTECT to prevent unauthorized access. THIS CODE USE wp_create_nonce() and wp_verify_nonce() functions
            SimplybookMePl_NonceProtect::checkNonce();

            $paramsToSave = array(
                'template',
                'server',
                'timeline_type',
                'datepicker_type',
                'is_rtl',
                'allow_switch_to_ada',
                'clear_session',
                'themeparams',
                'predefined'
            );

            $settings = array();
            foreach ($paramsToSave as $param) {
                if (isset($_POST[$param])) {
                    //check type and sanitize
                    switch ($param) {
                        default:
                            $settings[$param] = sanitize_text_field($_POST[$param]);
                            break;
                        case 'server':
                            $settings[$param] = sanitize_text_field($_POST[$param]);
                            simplybookMePl_setConfig('public_url', $settings[$param]);
                            break;
                        case 'themeparams':
                        case 'predefined':
                            $settings[$param] = array_map('sanitize_text_field', $_POST[$param]);
                            break;
                    }
                }
            }

            if (isset($settings['template'])) {
                $widgetSettings = simplybookMePl_getConfig('widget_settings');
                if (!$widgetSettings) {
                    $widgetSettings = array();
                }
                simplybookMePl_setConfig('widget_settings', array_merge($widgetSettings, $settings));
                simplybookMePl_addFlashMessage(__("Your settings were successfully saved", 'simplybook'), 'message');
            }
            simplybookMePl_redirectToAdminPage('main');
            return false;
        }

        protected function addThickbox()
        {
            wp_enqueue_script('thickbox');
            wp_enqueue_style('thickbox');
        }

        public function render($page)
        {
            $this->addThickbox();
            $this->_checkActionCall();

            $data = array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'login_url' => $this->auth->getAuthUrl(),
                'api_url' => $this->auth->getApiURL(false) . 'public',
                'is_auth' => $this->auth->isAuthorized(),
                'auth_data' => $this->auth->getAuthData(),
                '_wpnonce' => SimplybookMePl_NonceProtect::getNonce(),
                'timeline_type' => 'modern', //default timeline type
                'template' => 'default', //default template
                'sb_services_url' => $this->auth->createSbUrl('/v2/management/#services'),
                'sb_providers_url' => $this->auth->createSbUrl('/v2/management/#providers'),
                'sb_bookings_url' => $this->auth->createSbUrl('/v2/index/index'),
                'sb_plugins_url' => $this->auth->createSbUrl('/v2/management/#plugins'),
                'sb_manage_schedule_url' => $this->auth->createSbUrl('/v2/management/#company-worktime/week'),
                'sb_manage_notifications_url' => $this->auth->createSbUrl('/settings/templates'),
                'delete_widget_page_url' => simplybookMePl_makeUrl(array(
                    'm' => 'delete-widget-page',
                )),
                'widget_page_url' => $this->createPageWithWidget(),
                'widget_page_edit_url' => $this->createPageWithWidget(true),
                'error' => $this->error,
                'message' => $this->message,
            );

            if ($data['is_auth']) {
                $data['providers'] = $this->auth->getProviders();
                $data['services'] = $this->auth->getServices();
                $data['categories'] = $this->auth->getCategories();
                $data['locations'] = $this->auth->getLocations();
                //$data['intake_forms'] = $this->auth->getIntakeFormFields();
                $pluginList = $this->auth->getPluginsList();
                $pluginListAssoc = array();
                foreach ($pluginList as $plugin) {
                    $pluginListAssoc[$plugin['key']] = $plugin;
                }
                $data['plugins'] = $pluginListAssoc;

                $data['predefined_existed'] = ($data['providers'] || $data['services'] || $data['categories'] || $data['locations']);
            }

            $widgetSettings = simplybookMePl_getConfig('widget_settings');

            if ($widgetSettings) {
                foreach ($widgetSettings as $key => $value) {
                    $data[$key] = $value;
                }
            }

           // echo $this->twig->render('admin.main.twig', $data);
            /**
             * Note to reviewer:
             * In this case, I use wp_kses, but additionally I have to use str_replace, because your function contains a bug, and breaks the parameters that are in the urls.
             * Example: http://www.youtube.com/watch?v=nTDNLUzjkpg&hd=1 after wp_kses will be http://www.youtube.com/watch?v=nTDNLUzjkpg&amp;hd=1
             * Accordingly, if this url is contained in an html element or in javascript, it automatically becomes non-working.
             * I want to note that you have an open ticket for this (already 14 years old). And it is not resolved.
             *  https://core.trac.wordpress.org/ticket/11311
             */
            echo str_replace('%amp%', '&', wp_kses($this->twig->render('admin.main.twig', $data), simplybookMePl_getAllowedHtmlEntities()));
        }

        public function deleteWidgetPageAction(){
            $page = get_page_by_path('simplybook-widget');
            $pageId = simplybookMePl_getConfig('widget_page_id');

            if(!$page && $pageId){
                $page = get_post($pageId);
            }

            if(!$page) {
                simplybookMePl_addFlashMessage(__('Page not found', 'simplybook'), 'error');
            } else {
                wp_delete_post($page->ID, true);
                //save to config that page was deleted
                simplybookMePl_setConfig('widget_page_deleted', true);
                simplybookMePl_setConfig('widget_page_id', null);
                simplybookMePl_addFlashMessage(__('Page was successfully deleted', 'simplybook'), 'message');
            }
            return true;
        }

        protected function createPageWithWidget($editUrl = false){
            //check if page was deleted

            //check if page exist (by slug)
            $page = get_page_by_path('simplybook-widget');
            $pageId = simplybookMePl_getConfig('widget_page_id');

            if($page && !$pageId){
                simplybookMePl_setConfig('widget_page_id', $page->ID);
            }else if(!$page && $pageId){
                $page = get_post($pageId);
            }

            if(!$page) {
                $pageDeleted = simplybookMePl_getConfig('widget_page_deleted');
                if($pageDeleted) {
                    return null;
                }

                $pageData = array(
                    'post_title' => 'SimplyBook.me Booking Page',
                    //'post_content' => '[simplybook_widget]',
                    'post_content' => "<!-- wp:simplybook/widget -->\n<div class=\"wp-block-simplybook-widget\"></div>\n<!-- /wp:simplybook/widget -->",
                    'post_status' => 'publish',
                    'post_author' => 1,
                    'post_type' => 'page',
                    'post_name' => 'simplybook-widget',
                    'comment_status' => 'closed',
                    'ping_status' => 'closed',
                    'menu_order' => 0,
                );
                $pageId = wp_insert_post($pageData);
                simplybookMePl_setConfig('widget_page_id', $pageId);

                if($pageId) {
                    $page = get_post($pageId);
                }
            }

            $url = null;

            if($editUrl){
                if ($page && !is_wp_error($page)) {
                    $url = get_edit_post_link($page->ID);
                }
            } else {
                if ($page && !is_wp_error($page)) {
                    $url = get_permalink($page->ID);
                }
            }

            return $url;
        }

    }
}