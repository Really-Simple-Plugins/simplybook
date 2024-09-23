<?php
if ( ! defined( 'ABSPATH' ) ) exit;

if(!class_exists('SimplybookMePl_AdminCheckPage')) {
    class SimplybookMePl_AdminCheckPage extends SimplybookMePl_AdminCommon
    {

        public function __construct($twig)
        {
            parent::__construct($twig);

//            $authData = $this->auth->getAuthData();
//
//            if ($authData && isset($_REQUEST['token'])) {
//                simplybookMePl_redirectToAdminPage('main');
//            }

//            $apiStatus = simplybookMePl_getConfig('api_status');
//            if ($apiStatus && $apiStatus['status'] == 'error') {
//                //can`t connect to API.
//                simplybookMePl_addFlashMessage(__('We are currently unable to establish a connection with the API. It\'s possible that the company has disabled access to the API. Some settings may be outdated, but the widget will continue to function using previously saved data. To resolve this issue, please attempt to log in again.', 'simplybook'), 'error');
//            }

            $this->initScripts();
        }

        protected function initScripts()
        {

        }

        protected function _checkSteps()
        {
            $result = [];
            //check php version 7.4
            $result[] = [
                'name' => __('PHP version >= 7.4', 'simplybook'),
                'status' => version_compare(phpversion(), '7.4', '>='),
                'message' => __('PHP version is ', 'simplybook') . phpversion(),
                'error' => __('PHP version must be 7.4 or higher', 'simplybook'),
                'solution' => __('Please update PHP to version 7.4 or higher. If you are using a shared hosting, please contact your hosting provider.', 'simplybook'),
            ];

            $result[] = [
                'name' => __('WordPress version >= 5.7', 'simplybook'),
                'status' => version_compare(get_bloginfo('version'), '5.7', '>='),
                'message' => __('WordPress version is ', 'simplybook') . get_bloginfo('version'),
                'error' => __('WordPress version must be 5.7 or higher', 'simplybook'),
                'solution' => __('Please update WordPress to version 5.7 or higher. If you are using WordPress hosting, please contact your hosting provider.', 'simplybook'),
            ];

            $result[] = [
                'name' => __('Curl extension', 'simplybook'),
                'status' => extension_loaded('curl'),
                'message' => __('Curl extension is ', 'simplybook') . (extension_loaded('curl') ? __('enabled', 'simplybook') : __('disabled', 'simplybook')),
                'error' => __('Curl extension must be enabled', 'simplybook'),
                'solution' => __('Please enable the curl extension in your php.ini file. To do this, you need to find the line ;extension=curl and remove the semicolon at the beginning of the line. Please check if php-curl extension is installed on your server. If you are using a shared hosting, please contact your hosting provider.', 'simplybook'),
            ];

            $result[] = [
                'name' => __('JSON extension', 'simplybook'),
                'status' => extension_loaded('json'),
                'message' => __('JSON extension is ', 'simplybook') . (extension_loaded('json') ? __('enabled', 'simplybook') : __('disabled', 'simplybook')),
                'error' => __('JSON extension must be enabled', 'simplybook'),
                'solution' => __('Please enable the json extension in your php.ini file. To do this, you need to find the line ;extension=json and remove the semicolon at the beginning of the line. Please check if php-json extension is installed on your server. If you are using a shared hosting, please contact your hosting provider.', 'simplybook'),
            ];

            $result[] = [
                'name' => __('Connection to SimplyBook.me API', 'simplybook'),
                'status' => $this->auth->checkApiConnection(),
                'message' => __('Connection to SimplyBook.me API is ', 'simplybook') . ($this->auth->checkApiConnection() ? __('successful', 'simplybook') : __('failed', 'simplybook')),
                'error' => __('Connection to SimplyBook.me API failed', 'simplybook'),
                'solution' => __('Please check DNS settings or firewall settings on your server. This error may be caused by a firewall blocking the connection to the SimplyBook.me API. If you are using a shared hosting, please contact your hosting provider.', 'simplybook'),
            ];

            $result[] = [
                'name' => __('CURL connection to other hosts', 'simplybook'),
                'status' => $this->_checkCurlConnection(),
                'message' => __('CURL connection to other hosts is ', 'simplybook') . ($this->_checkCurlConnection() ? __('successful', 'simplybook') : __('failed', 'simplybook')),
                'error' => __('CURL connection to other hosts failed', 'simplybook'),
                'solution' => __('Please check DNS settings or firewall settings on your server. This error may be caused by a firewall blocking the connection to other hosts. If you are using a shared hosting, please contact your hosting provider.', 'simplybook'),
            ];

            $result[] = [
                'name' => __('WordPress functions', 'simplybook'),
                'status' => $this->_checkWpFunctions(),
                'message' => __('WordPress functions are ', 'simplybook') . ($this->_checkWpFunctions() ? __('working correctly', 'simplybook') : __('not working correctly', 'simplybook')),
                'error' => __('WordPress functions are not working correctly', 'simplybook'),
                'solution' => __('Please check if all WordPress functions are working correctly: update_option, get_option, delete_option. If you are using a shared hosting, please contact your hosting provider.', 'simplybook'),
            ];

            $result[] = [
                'name' => __('WordPress nonce', 'simplybook'),
                'status' => SimplybookMePl_NonceProtect::checkNonce(),
                'message' => __('WordPress nonce is ', 'simplybook') . (SimplybookMePl_NonceProtect::checkNonce() ? __('working correctly', 'simplybook') : __('not working correctly', 'simplybook')),
                'error' => __('WordPress nonce is not working correctly', 'simplybook'),
                'solution' => __('Please check if WordPress nonce is working correctly. This problem may be caused by a conflict with other plugins. If you are using a shared hosting, please contact your hosting provider.', 'simplybook'),
            ];

            $result[] = [
                'name' => __('Output buffering', 'simplybook'),
                'status' => ini_get('output_buffering'),
                'message' => __('Output buffering is ', 'simplybook') . (ini_get('output_buffering') ? __('enabled', 'simplybook') : __('disabled', 'simplybook')),
                'error' => __('Output buffering must be enabled', 'simplybook'),
                'solution' => __('Please enable output buffering in your php.ini file. To do this, you need to find the line ;output_buffering = 4096 and remove the semicolon at the beginning of the line. If you are using a shared hosting, please contact your hosting provider.', 'simplybook'),
            ];

            //log file is writable
            $logFile = SimplybookMePl_PLUGIN_DIR . 'log.txt';
            $result[] = [
                'name' => __('Log file is writable', 'simplybook'),
                'status' => is_writable($logFile),
                'message' => __('Log file is ', 'simplybook') . (is_writable($logFile) ? __('writable', 'simplybook') : __('not writable', 'simplybook')),
                'error' => __('Log file must be writable', 'simplybook'),
                'solution' => __('Please check file permissions for log.txt file. To change file permissions, you need to use FTP or hosting control panel, or SSH (chmod 777 log.txt). If you are using a shared hosting, please contact your hosting provider.', 'simplybook'),
            ];
            return $result;
        }

        protected function _checkCurlConnection()
        {
            //download https://simplybook.me/robots.txt and check if first line contain Sitemap or User-agent
            $url = 'https://simplybook.me/robots.txt';
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            $output = curl_exec($ch);
            curl_close($ch);
            if($output){
                $lines = explode("\n", $output);
                if($lines[0] && (strpos($lines[0], 'Sitemap') !== false || strpos($lines[0], 'User-agent') !== false)){
                    return true;
                }
            }
            return false;
        }

        protected function _logFile()
        {
            //load last 2000 lines from log file
            $logFile = SimplybookMePl_PLUGIN_DIR . 'log.txt';
            $file = new SplFileObject($logFile, 'r');
            $file->seek(PHP_INT_MAX);

            $linesTotal = $file->key();
            $lines = 2000;
            $start = $linesTotal - $lines;
            if($start < 0){
                $start = 0;
            }
            $file->seek($start);

            $result = [];
            while (!$file->eof()) {
                $result[] = $file->current();
                $file->next();
            }
            return $result;
        }

        protected function _checkWpFunctions()
        {
            //set param, then get it and check if it is the same
            //then delete it and check if it is deleted
            $param = 'test_param';
            $value = 'test_value';
            update_option($param, $value);
            if(get_option($param) != $value){
                return false;
            }
            delete_option($param);
            if(get_option($param)){
                return false;
            }
            return true;
        }

        public function render($page)
        {
            $this->_checkActionCall();

            $resultCheck = $this->_checkSteps();

            $data = array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'login_url' => $this->auth->getAuthUrl(),
                'api_url' => $this->auth->getApiURL(false) . 'public',
                'is_auth' => $this->auth->isAuthorized(),
                'auth_data' => $this->auth->getAuthData(),
                'check_result' => $resultCheck,
                'log_file' => $this->_logFile(),
                'log_file_url' => plugins_url(SimplybookMePl_PLUGIN_NAME . '/log.txt'),
                '_wpnonce' => SimplybookMePl_NonceProtect::getNonce(),
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
            echo str_replace('%amp%', '&', wp_kses($this->twig->render('admin.check.twig', $data), simplybookMePl_getAllowedHtmlEntities()));
        }


    }
}