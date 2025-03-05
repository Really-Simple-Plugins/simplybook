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


        public function deleteWidgetPage(){
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