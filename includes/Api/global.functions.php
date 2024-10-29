<?php
if ( ! defined( 'ABSPATH' ) ) exit;



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