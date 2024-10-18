<?php
if ( ! defined( 'ABSPATH' ) ) exit;


if (!class_exists('SimplybookMePl_InternalApi')) {
    class SimplybookMePl_InternalApi
    {
        protected $auth = null;
        protected $error = null;
        protected $message = null;
        protected $request = null;


        public function __construct()
        {
            $this->auth = new SimplybookMePl_Api();
            $this->error = null;
            $this->message = null;
        }

        public function isAuthorized()
        {
            return $this->auth->isAuthorized();
        }

        public function getLocations($request){
            $this->request = $request;
            if(!$this->isAuthorized()){
                return array();
            }
            $locations = $this->auth->getLocations();
            $locations = array_values($locations);
            return $locations;
        }

        public function getCategories($request){
            $this->request = $request;

            if(!$this->isAuthorized()){
                return array();
            }
            $categories = $this->auth->getCategories();
            $categories = array_values($categories);
            return $categories;
        }

        public function getServices($request){
            $this->request = $request;

            //$locationId = $this->getParam('location_id');

            if(!$this->isAuthorized()){
                return array();
            }
            $services = $this->auth->getServices();
            $services = array_values($services);
//
//            if($locationId){
//
//            }
            return $services;
        }

        public function getProviders($request){
            $this->request = $request;

            $locationId = $this->getParam('location_id');
            $serviceId = $this->getParam('service_id');

            if(!$this->isAuthorized()){
                return array();
            }
            $providers = $this->auth->getProviders();
            $providers = array_values($providers);

            $isAnyProviderEnabled = $this->auth->isPluginEnabled('any_unit');

            if($isAnyProviderEnabled){
                //add any provider
                $anyProvider = array(
                    'id' => 'any',
                    'name' => 'Any provider',
                    'qty' => 1
                );
                $providers = array_merge(array($anyProvider), $providers);
            }



//            if($locationId){
//
//            }
//
//            if($serviceId){
//
//            }
            return $providers;
        }


        protected function getParam($param){
            if(!$this->request){
                return null;
            }
            $params = $this->request->get_params();

            if(isset($params[$param])){
                return $params[$param];
            }
            return null;
        }
    }

}