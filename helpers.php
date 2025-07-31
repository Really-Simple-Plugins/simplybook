<?php
if (!function_exists('simplybookMePl_getAllowedHtmlEntities')) {
    /**
     * @deprecated 3.2.0
     */
    function simplybookMePl_getAllowedHtmlEntities() {
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

if (!function_exists('simplybook_is_wp_json_request')) {
    /**
     * Check if the current request is a WP JSON request.
     *
     * @deprecated 3.2.0 Was only used internally in {@see /config/features.php}
     * and is therefor moved to
     * {@see \SimplyBook\Helpers\FeatureHelper::requestIsRestRequest}
     */
    function simplybook_is_wp_json_request(): bool {
        $restUrlPrefix = trailingslashit(rest_get_url_prefix());
        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
        $currentRequestUri = ($_SERVER['REQUEST_URI'] ?? '');
        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized, WordPress.Security.NonceVerification.Recommended
        $isPlainPermalink = isset($_GET['rest_route']) && strpos($_GET['rest_route'], 'simplybook/v') !== false;

        return (strpos($currentRequestUri, $restUrlPrefix) !== false) || $isPlainPermalink;
    }
}