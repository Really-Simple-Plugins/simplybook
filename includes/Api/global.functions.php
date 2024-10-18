<?php
if ( ! defined( 'ABSPATH' ) ) exit;

use Twig\TwigFilter;
use Twig\TwigFunction;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

$cache = array();

if(!function_exists('simplybookMePl_setConfig')){
    function simplybookMePl_setConfig($key, $value){
        global $cache;

        $pass = '7*w$9pumLw5koJc#JT6';
        $key = 'simplybookMePl_' . $key;

        if (is_array($value) || is_bool($value) || is_object($value)) {
            $value = serialize($value);
        }

        $value = simplybookMePl_encryptString($value, $pass);
        update_option($key, $value);

        // Оновлення кешу
        $cache[$key] = $value;
    }
}

if(!function_exists('simplybookMePl_getConfig')) {
    function simplybookMePl_getConfig($key, $default = null)
    {
        global $cache;

        if (isset($cache[$key])) {
            // Використовувати кешоване значення, якщо воно є
            $value = $cache[$key];
        } else {
            $pass = '7*w$9pumLw5koJc#JT6';
            $key = 'simplybookMePl_' . $key;
            $value = get_option($key);

            if ($value === false) {
                $value = $default;
            } else {
                $decryptedValue = simplybookMePl_decryptString($value, $pass);

                $unserializedValue = @unserialize($decryptedValue); // Suppress unserialize errors

                if ($unserializedValue !== false) {
                    $value = $unserializedValue;
                } else {
                    $value = $decryptedValue;
                }
            }

            // Кешувати отримане значення
            $cache[$key] = $value;
        }

        return $value;
    }
}

if(!function_exists('simplybookMePl_clearFlashMessages')) {
    function simplybookMePl_clearFlashMessages()
    {
        simplybookMePl_setConfig('flash_messages', array());
    }
}

if(!function_exists('simplybookMePl_addFlashMessage')) {
    function simplybookMePl_addFlashMessage($message, $type = 'error')
    {
        $messages = simplybookMePl_getConfig('flash_messages', array());
        $messages[] = array(
            'message' => $message,
            'type' => $type,
        );
        simplybookMePl_setConfig('flash_messages', $messages);
    }
}

if(!function_exists('simplybookMePl_getFlashMessages')) {
    function simplybookMePl_getFlashMessages()
    {
        $messages = simplybookMePl_getConfig('flash_messages', array());
        simplybookMePl_setConfig('flash_messages', array());
        return $messages;
    }
}

if(!function_exists('simplybookMePl_encryptString')) {
    function simplybookMePl_encryptString($string, $key){
    $ivLength = openssl_cipher_iv_length('AES-256-CBC');
    $iv = openssl_random_pseudo_bytes($ivLength);

    $encrypted = openssl_encrypt($string, 'AES-256-CBC', $key, 0, $iv);

    return base64_encode($iv . $encrypted);
}
}

if(!function_exists('simplybookMePl_decryptString')) {
    function simplybookMePl_decryptString($encryptedString, $key)
    {
        $data = base64_decode($encryptedString);
        $ivLength = openssl_cipher_iv_length('AES-256-CBC');
        $iv = substr($data, 0, $ivLength);
        $encrypted = substr($data, $ivLength);

        return openssl_decrypt($encrypted, 'AES-256-CBC', $key, 0, $iv);
    }
}

if(!function_exists('simplybookMePl_redirectToAdminPage')) {
    function simplybookMePl_redirectToAdminPage($page, $params = array())
    {
        $currentUrl = sanitize_url($_SERVER['REQUEST_URI']);

        $newUrl = simplybookMePl_addQueryParamsToUrl($currentUrl, array(
            'sbpage' => $page,
            //clear other params
            'm' => null,
            '_wpnonce' => null,
            'token' => null,
            'refresh_token' => null,
            'company' => null,
            'domain' => null,
            'session_id' => null,
            'code' => null,
        ));

        echo "<script>location.href = '" . esc_url($newUrl, null, 'db') . "';</script>";
        wp_redirect($newUrl);
        exit;
    }
}

if(!function_exists('simplybookMePl_makeUrl')) {
    function simplybookMePl_makeUrl($params){

        if(!is_array($params) && is_string($params)){
            $params = array(
                'sbpage' => $params,
            );
        }
        $orherAmpSymbol = '&';
        if(isset($params['amp_symbol'])){
            $orherAmpSymbol = $params['amp_symbol'];
            unset($params['amp_symbol']);
        }
        $currentUrl = sanitize_url($_SERVER['REQUEST_URI']);
        $newUrl = simplybookMePl_addQueryParamsToUrl($currentUrl, array_merge(array(
            //clear other params
            'm' => null,
            '_wpnonce' => null,
            'token' => null,
            'refresh_token' => null,
            'company' => null,
            'domain' => null,
            'session_id' => null,
            'code' => null,
        ), $params));
        return str_replace('&', $orherAmpSymbol, $newUrl);
    }
}

if(!function_exists('simplybookMePl_addQueryParamsToUrl')) {
    function simplybookMePl_addQueryParamsToUrl($url, $queryParams)
    {
        $urlParts = parse_url($url);
        $scheme = isset($urlParts['scheme']) ? $urlParts['scheme'] . '://' : '';
        $host = isset($urlParts['host']) ? $urlParts['host'] : '';
        $path = isset($urlParts['path']) ? $urlParts['path'] : '';
        $existingQuery = isset($urlParts['query']) ? $urlParts['query'] : '';

        $existingParams = array();
        parse_str($existingQuery, $existingParams);

        $mergedParams = array_merge($existingParams, $queryParams);

        $newQuery = http_build_query($mergedParams);

        $newUrl = $scheme . $host . $path;
        if (!empty($newQuery)) {
            $newUrl .= '?' . $newQuery;
        }

        if (isset($urlParts['fragment'])) {
            $newUrl .= '#' . $urlParts['fragment'];
        }

        return $newUrl;
    }
}

if(!function_exists('simplybookMePl_initTwig')) {
    function simplybookMePl_initTwig()
    {
        $loader = new FilesystemLoader(SimplybookMePl_TEMPLATE_DIR);
        $twig = new Environment($loader, array(
            'cache' => SimplybookMePl_PLUGIN_DIR . 'cache',
            'auto_reload' => true,
        ));

        $function = new TwigFunction('makeUrl', function ($params = array()) {
            $params['_wpnonce'] = SimplybookMePl_NonceProtect::getNonce();
            return simplybookMePl_makeUrl($params);
        });
        $twig->addFunction($function);

        //add preg_replace
        $pregReplaceFunction = new TwigFilter('pregReplace', function ($subject, $pattern, $replacement) {
            return preg_replace($pattern, $replacement, $subject);
        });

        $twig->addFilter($pregReplaceFunction);

        //add base64_encode
        $base64EncodeFunction = new TwigFunction('base64Encode', function ($string) {
            if(!is_string($string)){
                $string = json_encode($string);
            }
            return base64_encode($string);
        });
        $twig->addFunction($base64EncodeFunction);

        $translationFunction = new TwigFunction('__', function ($key) {
//        //check if translation exists
//        $translation = __($key, 'simplybook');
//        if($translation == $key){
//            $text = "# .twig file\n";
//            $text .= "msgid \"$key\"\nmsgstr \"\"\n\n";
//            file_put_contents(SimplybookMePl_PLUGIN_DIR . 'translation.log', $text, FILE_APPEND);
//            return $key;
//        }
            return __($key, 'simplybook');
            //return $key;
        });

        $twig->addFunction($translationFunction);

        //create file url
        $fileUrlFunction = new TwigFunction('makeurl', function ($url) {
            return plugins_url(SimplybookMePl_PLUGIN_NAME . '/content/' . $url);
        });

        $twig->addFunction($fileUrlFunction);

        return $twig;
    }
}

if(!function_exists('simplybookMePl_js_load_custom_translation')) {
    function simplybookMePl_js_load_custom_translation(){
        $currentLocale = get_locale();
        $pluginLanguagesDir = SimplybookMePl_PLUGIN_DIR . 'languages/';

        $jsonFile = $pluginLanguagesDir . 'simplybook-' . $currentLocale . '.json';
        $defaultJsonFile = $pluginLanguagesDir . 'simplybook-en_US.json';

        if (file_exists($jsonFile)) {
            //    wp_register_script('sb_js_translations', plugins_url( str_replace(SimplybookMePl_PLUGIN_DIR, SimplybookMePl_PLUGIN_NAME, $jsonFile) ), array( 'wp-i18n' ), '0.0.1');
        } else {
            //     wp_register_script('sb_js_translations', plugins_url( str_replace(SimplybookMePl_PLUGIN_DIR, SimplybookMePl_PLUGIN_NAME, $defaultJsonFile) ), array( 'wp-i18n' ), '0.0.1');
        }
    }
}

if(!function_exists('simplybookMePl_getAllowedHtmlEntities')){
    function simplybookMePl_getAllowedHtmlEntities(){

        $allowedEnt = array(
            'a'=>array('href'=>array(),'title'=>array(),'target'=>array(), 'role'=>array(), 'aria-expanded'=>array(), 'data-target'=>array(), 'data-toggle'=>array(),),
            'script'=>array('src'=>array(),'type'=>array(),),
            'br'=>array(),'em'=>array(),'strong'=>array(),'p'=>array(),'b'=>array(),'div'=>array(),
            'label'=>array('for'=>array(),),'select'=>array('name'=>array(),'value'=>array(),),
            'option'=>array('value'=>array(),'selected'=>array(),),
            'input'=>array('type'=>array(),'name'=>array(),'value'=>array(),'checked'=>array(),'placeholder'=>array(),'required'=>array(),),
            'form'=>array('action'=>array(),'method'=>array(),'enctype'=>array(),'name'=>array(),),
            'button'=>array('type'=>array(),'name'=>array(),'value'=>array(), 'aria-expanded'=>array(), 'data-target'=>array(), 'data-toggle'=>array(),),
            'span'=>array('type'=>array(), 'aria-expanded'=>array(), 'data-target'=>array(), 'data-toggle'=>array(),),
            'h1'=>array(),'h2'=>array(),'h3'=>array(),'h4'=>array(),'h5'=>array(),'h6'=>array(),
            'img'=>array('src'=>array(),'alt'=>array(),'title'=>array(),),'ul'=>array(),'li'=>array(),
            'ol'=>array(),'table'=>array(),'tr'=>array(),'td'=>array(),'th'=>array(),'tbody'=>array(),
            'thead'=>array(),'tfoot'=>array(),
            'iframe'=>array('src'=>array(), 'data-src'=>array(),'scrolling'=>array(),'width'=>array(),'height'=>array(),'name'=>array(),'action'=>array(),'frameborder'=>array(),'allowfullscreen'=>array(),),
            'picture'=>array(),
            'textarea'=>array('name'=>array(),'value'=>array(),'placeholder'=>array(),'required'=>array(),),
            'section'=>array(),
            'article'=>array(),
            'main'=>array(),
            'header'=>array(),
            'footer'=>array(),
            'i'=>array(),
            'svg'=>array('xmlns'=>array(), 'viewBox'=>array(), 'data-viewbox'=>array(),),
            'path'=>array('fill'=>array(), 'd'=>array(),),
        );

        foreach ($allowedEnt as $key => $value){
            $allowedEnt[$key] = array_merge($value, array(
                'style' => array(),
                'class' => array(),
                'id' => array(),
                'scope' => array(),
                'data-*' => array(),
                'title' => array(),
                'data' => array(),
                'data-mce-id' => array(),
                'data-mce-style' => array(),
                'data-mce-bogus' => array(),
            ));
        }

        return $allowedEnt;
    }
}