<?php
if ( ! defined( 'ABSPATH' ) ) exit;


if (!class_exists('SimplybookMePl_Api')) {
    class SimplybookMePl_Api
    {

        protected $_commonCacheKey = '_v13';
        protected $_avLanguages = [
            'en', 'fr', 'es', 'de', 'ru', 'pl', 'it', 'uk', 'zh', 'cn', 'ko', 'ja', 'pt', 'br', 'nl'
        ];

        protected $_lastErrorCode = null;
        protected $_lastErrorMessage = null;
        protected $_lastErrorData = null;

        public function __construct()
        {
        }

        public function auth()
        {
            $url = $this->getAuthUrl();
            $this->_redirect($url);
        }

        public function getDomain()
        {
            $domain = simplybookMePl_getConfig('domain');
            if (!$domain) {
                $domain = 'simplybook.me';
            }
            return $domain;
        }

        public function setDomain($domain)
        {
            //check domain
            if (!$domain || !preg_match('/^[a-z0-9\-\.]+$/i', $domain)) {
                return false;
            }
            if (strpos($domain, '.em.') !== false) {
                //remove all before .em.
                $domain = substr($domain, strpos($domain, '.em.') + 1);
            }

            //check domain DNS
            $dns = dns_get_record($domain, DNS_A);
            if (!$dns) {
                return false;
            }
            simplybookMePl_setConfig('domain', $domain);
            return true;
        }

        public function confirm($companyLogin, $code, $confirmationCode, $sessionId)
        {
            if (!$code || !$confirmationCode || !$sessionId || !$companyLogin) {
                return false;
            }

            $url = $this->_getApiUrl() . 'admin/auth/2fa';
            $args = array(
                'body' => json_encode(array(
                    'code' => $code,
                    'confirmation_code' => $confirmationCode,
                    'session_id' => $sessionId,
                    'company' => $companyLogin,
                    'type' => 'oauth',
                )),
                'headers' => array(
                    'Content-Type' => 'application/json',
                ),
            );
            $response = wp_remote_post($url, $args);
            $resultRaw = wp_remote_retrieve_body($response);

            if (is_wp_error($response)) {
                $this->_log(json_encode($response));
                return false;
            }

            $result = json_decode($resultRaw, true);

            if (!$result || !isset($result['token']) || !$result['token']) {
                $this->_log('Logout because incorrect data received');
                $this->_log($resultRaw);
                $this->logout();
                return false;
            }

            $authData = array(
                'token' => $result['token'],
                'company' => $companyLogin,
                'refresh_token' => $result['refresh_token'],
                'domain' => $result['domain'],
            );

            simplybookMePl_setConfig('auth_data', $authData);
            simplybookMePl_setConfig('auth_datetime', time());
            simplybookMePl_setConfig('is_auth', true);

            return true;
        }

        public function logout()
        {
            $this->_log(debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS));
            $clearKeys = array('auth_data', 'is_auth', 'auth_datetime', 'widget_settings', 'api_status', 'widget_page_deleted');

            foreach ($clearKeys as $key) {
                simplybookMePl_setConfig($key, null);
            }
            $this->_clearCache();
        }

        public function checkApiConnection(){
            $apiUrl = $this->_getApiUrl() . 'admin';
            $response = wp_remote_get($apiUrl);

            //if reponse 401 and valid json - api is working
            if(wp_remote_retrieve_response_code($response) == 401){
                $result = wp_remote_retrieve_body($response);
                $result = json_decode($result, true);
                if($result && isset($result['code']) && $result['code'] == 401){
                    return true;
                }
            }
            return false;
        }

        protected function _redirect($url, $params = array())
        {
            $params['exit'] = true;
            header('Location: ' . $url);
            exit;
        }

        /*POST https://user-api-v2.simplybook.me/admin/auth/refresh-token
        Content-Type: application/json

        {
        "company": "<insert your company login>",
        "refresh_token": "<insert refresh_token from auth step>"
        }*/
        public function refreshToken()
        {
            $authData = $this->getAuthData();
            if (!$authData) {
                return false;
            }

            $url = $this->_getApiUrl() . 'admin/auth/refresh-token';
            $args = array(
                'body' => json_encode(array(
                    'company' => $authData['company'],
                    'refresh_token' => $authData['refresh_token'],
                )),
                'headers' => array(
                    'Content-Type' => 'application/json',
                ),
            );
            $response = wp_remote_post($url, $args);
            $result = wp_remote_retrieve_body($response);

            if (is_wp_error($response)) {
                $this->_log(json_encode($response));
                return false;
            }

            $result = json_decode($result, true);

            if (!$result || !isset($result['token']) || !$result['token']) {
                $this->_log('Logout after Refresh token because incorrect data received');
                //$this->logout();
                return false;
            }

            $authData = array_merge($authData, $result, array(
                'is_refreshed' => true,
                'refresh_time' => time(),
            ));

            simplybookMePl_setConfig('auth_data', $authData);
            simplybookMePl_setConfig('auth_datetime', time());
            simplybookMePl_setConfig('is_auth', true);

            return true;
        }

        public function isAuthorized()
        {
            $authData = $this->getAuthData();
            $authDatetime = simplybookMePl_getConfig('auth_datetime');
            $isAuth = simplybookMePl_getConfig('is_auth');

            if ($isAuth && $authDatetime) {
                if ($authData && !isset($authData['is_refreshed'])) {
                    return $this->refreshToken();
                }

                $authDatetime = (int)$authDatetime;
                $now = time();
                $diff = $now - $authDatetime;

                if ($diff > 60 * 60 * 3.5) { // 3.5 hours
                    return $this->refreshToken();
                }

                return true;
            }
            return false;
        }

        public function getAuthHashData(){
            $url = $this->_getApiUrl() . '/admin/auth/create-login-hash';
            return $this->makeApiCall($url, null, 'POST');
        }

        public function getAuthData()
        {
            $authData = simplybookMePl_getConfig('auth_data');

            if ($authData) {
                return $authData;
            } else if (isset($_GET['token']) && isset($_GET['refresh_token'])) {
                $authData = array(
                    'token' => sanitize_text_field($_GET['token']),
                    'company' => sanitize_text_field($_GET['company']),
                    'refresh_token' => sanitize_text_field($_GET['refresh_token']),
                    'domain' => sanitize_text_field($_GET['domain']),
                );

                simplybookMePl_setConfig('auth_data', $authData);
                simplybookMePl_setConfig('auth_datetime', time());
                simplybookMePl_setConfig('is_auth', true);

                return $authData;
            } else {
                return false;
            }
        }

        protected function _getCallbackUrl()
        {
            return sanitize_url((empty($_SERVER['HTTPS']) ? 'http' : 'https') . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
        }

        public function getMainSiteUrl()
        {
            $domain = $this->getDomain();
            $mainSite = 'https://' . $domain;

            if (strpos($domain, 'em.') !== false) {
                $mainSite = 'https://' . 'simplybook.' . $domain;
            }
            return $mainSite;
        }

        public function getCompanyUrl($admin = true){
            $login = $this->getAuthData()['company'];
            $domain = $this->getAuthData()['domain'];
            $isCustomDomain = false;

            //check if domain ends with .simplybook.(me|it|asia|net|org) its not custom domain
            if(!preg_match('/simplybook\.(me|it|asia|net|org|ovh)$/i', $domain)){
                $isCustomDomain = true;
            }

            if($admin){
                if($isCustomDomain) {
                    $domain = 'simplybook.me';
                }
                return "https://{$login}.secure.{$domain}";
            } else {
                $publicUrl = simplybookMePl_getConfig('public_url');
                if($publicUrl){
                    return 'https://' . $publicUrl;
                } else {
                    return "https://{$login}.{$domain}";
                }
            }

        }

        public function getAuthUrl()
        {
            $mainSite = $this->getMainSiteUrl();

            $url = $mainSite . '/oauth/ologin/?' . http_build_query(array(
                    'redirect_uri' => $this->_getCallbackUrl(),
                ));
            return $url;
        }

        public function getAdminUrl(){
            return $this->getCompanyUrl(true);
        }


        protected function _checkAddParamToUrl($url, $param, $value){
            if (strpos($url, $param . '=') === false) {
                $url .= '&' . $param . '=' . $value;
            } else {
                $url = preg_replace('/' . $param . '=[^&]+/', $param . '=' . $value, $url);
            }
            return $url;
        }

        public function getRegisterUrl(){
            $callbackUrl = $this->_getCallbackUrl();

            $callbackUrl = $this->_checkAddParamToUrl($callbackUrl, 'sbpage', 'login');
            $callbackUrl = $this->_checkAddParamToUrl($callbackUrl, 'm', 'confirm');
            $callbackUrl = $this->_checkAddParamToUrl($callbackUrl, '_wpnonce', SimplybookMePl_NonceProtect::getNonce());

            $wpLanguage = get_locale();

            $simplybookAvailableLanguages = $this->_avLanguages;

            $iso2lang = substr($wpLanguage, 0, 2);
            if(!in_array($iso2lang, $simplybookAvailableLanguages)){
                $iso2lang = 'en';
            }

            //check if EXTENDIFY_PARTNER_ID is set
            if(defined('EXTENDIFY_PARTNER_ID')){
                $extendifyPartnerId = EXTENDIFY_PARTNER_ID;
            } else {
                $extendifyPartnerId = null;
            }

            $params = array(
                'redirect_uri' => get_site_url() . "/?p=-1&sbcburl=" . urlencode(base64_encode($callbackUrl)),
                'ref' => 'wpplugin',
            );

            if($extendifyPartnerId){
                $params['epid'] = $extendifyPartnerId;
            }

            $url = $this->getMainSiteUrl() . "/{$iso2lang}/default/registration/type/wordpress/?" . http_build_query($params);

            return $url;
        }

        public function createSbUrl($urlPath){
            //$simplybookAdminUrl = $this->getCompanyUrl(true);

            $simplybookAdminUrl = '';

            $url = simplybookMePl_makeUrl(array(
                'sbpage' => 'sbredirect',
                '_wpnonce' => SimplybookMePl_NonceProtect::getNonce(),
                'sburl' => $simplybookAdminUrl . $urlPath,
            ));

            return $url;
        }

        public function getCallbackUrl()
        {
            return $this->_getCallbackUrl();
        }

        protected function _getApiUrl()
        {
            $domain = $this->getDomain();
            return 'https://user-api-v2.' . $domain . '/';
        }

        public function getApiURL($v2 = true)
        {
            $domain = $this->_getApiUrl();
            if ($v2) {
                return $domain;
            } else {
                return str_replace('user-api-v2', 'user-api', $domain);
            }
        }

        protected function _getApiCurl()
        {
            if (!$this->isAuthorized()) {
                throw new SimplybookMePl_Exception('Not authorized');
            }

            $args = array(
                'headers' => array(
                    'Content-Type' => 'application/json',
                    'X-Company-Login' => $this->getAuthData()['company'],
                    'X-Token' => $this->getAuthData()['token'],
                ),
            );
            return $args;
        }

        protected function _clearCache()
        {
            $cachedKeys = simplybookMePl_getConfig('cached_keys');
            if (!$cachedKeys) {
                $cachedKeys = array();
            }
            foreach ($cachedKeys as $key => $time) {
                delete_transient($key);
            }
            simplybookMePl_setConfig('cached_keys', array());
        }


        //GET https://user-api-v2.simplybook.me/admin/providers?filter[search]=mike&filter[service_id]=1
        //Content-Type: application/json
        //X-Company-Login: <insert your company login>
        //X-Token: <insert your token from auth step>
        //Response in JSON format
        //With cache data on 30 minutes
        public function getProviders()
        {
            $cacheKey = 'sb_plugin_providers' . $this->_commonCacheKey;

            if (($result = get_transient($cacheKey)) !== false) {
                return $result['data'];
            }
            $url = $this->_getApiUrl() . 'admin/providers';
            return $this->makeApiCall($url, $cacheKey);
        }

        public function getServices()
        {
            $cacheKey = 'sb_plugin_services' . $this->_commonCacheKey;
            if (($result = get_transient($cacheKey)) !== false) {
                return $result['data'];
            }
            $url = $this->_getApiUrl() . 'admin/services';
            return $this->makeApiCall($url, $cacheKey);
        }

        public function getCategories()
        {
            $cacheKey = 'sb_plugin_categories' . $this->_commonCacheKey;
            if (($result = get_transient($cacheKey)) !== false) {
                return $result['data'];
            }
            $url = $this->_getApiUrl() . 'admin/categories';
            return $this->makeApiCall($url, $cacheKey);
        }

        public function getLocations()
        {
            $cacheKey = 'sb_plugin_locations' . $this->_commonCacheKey;
            if (($result = get_transient($cacheKey)) !== false) {
                return $result['data'];
            }
            $url = $this->_getApiUrl() . 'admin/locations';
            return $this->makeApiCall($url, $cacheKey);
        }

        public function getPluginsList()
        {
            $cacheKey = 'sb_plugin_plugins' . $this->_commonCacheKey;
            if (($result = get_transient($cacheKey)) !== false) {
                return $result['data'];
            }
            $url = $this->_getApiUrl() . 'admin/plugins';
            return $this->makeApiCall($url, $cacheKey);
        }

        public function isPluginEnabled($pluginKey){
            $plugins = $this->getPluginsList();
            if(!$plugins){
                return false;
            }
            foreach($plugins as $plugin){
                if($plugin['key'] == $pluginKey){
                    return $plugin['is_active'];
                }
            }
            return false;
        }

        protected function _log($error)
        {
            $fileTrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
            $last4 = array_slice($fileTrace, 0, 4);
            $logFile = SimplybookMePl_PLUGIN_DIR . 'log.txt';

            //check if log file exists and if we can create it
            if (!file_exists($logFile) && !is_writable(dirname($logFile))) {
                return;
            }

            if(!is_string($error)){
                @ob_start();
                var_dump($error);
                $error = @ob_get_clean();
            }

            $error = date('Y-m-d H:i:s') . ' ' . $error . "\n";
            $error .= "\n\n" . implode("\n", array_map(function ($item) {
                    return $item['file'] . ':' . $item['line'];
                }, $last4));
            $error .= "\n----------------------\n\n\n";
            file_put_contents($logFile, $error, FILE_APPEND);
        }

        public function getLastError()
        {
            return array(
                'code' => $this->_lastErrorCode,
                'message' => $this->_lastErrorMessage,
                'data' => $this->_lastErrorData,
            );
        }

        /**
         * @param $url
         * @param $cacheKey
         * @return array|mixed
         * @throws SimplybookMePl_Exception
         */
        protected function makeApiCall($url, $cacheKey = null, $type = "GET", $params = array())
        {
            $apiStatus = simplybookMePl_getConfig('api_status');
            if ($apiStatus && $apiStatus['status'] == 'error' && $apiStatus['time'] > time() - 60 * 60 && $cacheKey) {
                $longCacheData = get_transient($cacheKey . '_long'); //return long cache
                return $longCacheData ? (isset($longCacheData['data'])? $longCacheData['data'] : $longCacheData) : null;
            }
            if(!$params || !count($params)){
                $params = array(
                    'page' => 1,
                    'on_page' => 100,
                );
            }

            $args = $this->_getApiCurl();
            if($type == "POST"){
                $args['body'] = json_encode($params);
                $response = wp_remote_post($url, $args);
            } else if ($type == "GET") {
                $url = simplybookMePl_addQueryParamsToUrl($url, $params);
                $response = wp_remote_get($url, $args);
            }

            $result = wp_remote_retrieve_body($response);


            if (is_wp_error($response) || wp_remote_retrieve_response_code($response) != 200) {

                if ($result) {
                    $resultс = json_decode($result, true);

                    if ($resultс && $resultс['code'] == 419) {
                        $isRefreshed = $this->refreshToken();
                        if ($isRefreshed) {
                            return $this->makeApiCall($url, $cacheKey);
                        }
                    }
                }

                $resultArr = null;
                if($result){
                    $resultArr = json_decode($result, true);
                }

                if($resultArr && isset($resultArr['message'])){
                    $errorMsg = 'Curl error: ' . $resultArr['message'] . ' Http code:' . wp_remote_retrieve_response_code($response) . ' Response body: ' . $result;
                } else {
                    $errorMsg = 'Curl error: ' . $response['response']['message'] . ' Http code:' . $response['response']['code'] . ' Response body: ' . $result;
                }

                $this->_lastErrorCode = wp_remote_retrieve_response_code($response);
                $this->_lastErrorMessage = ($resultArr && isset($resultArr['message'])) ? $resultArr['message'] : $response['response']['message'];
                $this->_lastErrorData = $resultArr;
                //$errorMsg = 'Curl error: ' . $response['response']['message'] . ' Http code:' . $response['response']['code'] . ' Response body: ' . $result;

                // $this->logout(); //todo: maybe remove this and return cached data

                if($cacheKey) {
                    simplybookMePl_setConfig('api_status', array(
                        'status' => 'error',
                        'error' => $errorMsg,
                        'time' => time(),
                    ));
                }
                $this->_log($errorMsg);
                return array();
            }
            //curl_close($curl);

            $result = json_decode($result, true);

            if($cacheKey) {
                $cachedKeys = simplybookMePl_getConfig('cached_keys');
                if (!$cachedKeys) {
                    $cachedKeys = array();
                }
                $cachedKeys[$cacheKey] = time();
                $cachedKeys[$cacheKey . '_long'] = time();
                simplybookMePl_setConfig('cached_keys', $cachedKeys);

                set_transient($cacheKey, $result, 30 * 60);
                //save current data to long cache
                set_transient($cacheKey . '_long', $result, 0); //never expire
            }

            simplybookMePl_setConfig('api_status', array(
                'status' => 'success',
                'time' => time(),
            ));
            return isset($result['data']) ? $result['data'] : $result;
        }
    }
}