<?php
namespace Simplybook\Admin\RestApi;

use Simplybook\Api\Api;
use Simplybook\Traits\Helper;
use Simplybook\Traits\Save;
use WP_Error;
use WP_REST_Response;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Onboarding extends RestApi {
    use Helper;
    use Save;

    public function register_rest_route(): void
    {
        register_rest_route(
            'simplybook/v1',
            'onboarding/register_email',
            array(
                'methods' => 'POST',
                'callback' => array( $this, 'register_email' ),
                'permission_callback' => function ( $request ) {
	                return $this->validate_request( $request );
                },
            )
        );

        register_rest_route(
            'simplybook/v1',
            'onboarding/tipstricks',
            array(
                'methods' => 'POST',
                'callback' => array( $this, 'tipstricks' ),
                'permission_callback' => function ( $request ) {
                    return $this->validate_request( $request );
                },
            )
        );

        register_rest_route(
            'simplybook/v1',
            'onboarding/company_registration',
            array(
                'methods' => 'POST',
                'callback' => array( $this, 'register_company' ),
                'permission_callback' => function ( $request ) {
                    return $this->validate_request( $request );
                },
            )
        );

		register_rest_route(
            'simplybook/v1',
            'onboarding/get_recaptcha_sitekey',
            array(
                'methods' => 'POST',
                'callback' => array( $this, 'get_recaptcha_sitekey' ),
                'permission_callback' => function ( $request ) {
                    return $this->validate_request( $request );
                },
            )
        );

	    register_rest_route(
		    'simplybook/v1',
		    'onboarding/confirm_email',
		    array(
			    'methods' => 'POST',
			    'callback' => array( $this, 'confirm_email' ),
			    'permission_callback' => function ( $request ) {
				    return $this->validate_request( $request );
			    },
		    )
	    );
    }

    /**
     * Register a user with email addres with Simplybookme
     *
     * @param $request
     * @param [] $ajax_data
     * @return WP_REST_Response
     */
    public function register_email($request, $ajax_data = [] ): WP_REST_Response
    {
		$data = !empty($ajax_data) ? $ajax_data : $request->get_json_params();
		$data = $data['data'] ?? [];
	    $this->update_option('email', sanitize_email( $data['email'] ) );
	    $this->update_option('terms-and-conditions', (bool) $data['terms-and-conditions'] );

        return $this->response([
            'message' => __('Email registered successfully', 'simplybook'),
        ]);
    }

    /**
     * Register a user with email addres with Simplybookme
     *
     * @param $request
     * @param array $ajax_data
     * @return WP_REST_Response
     */
    public function tipstricks($request, $ajax_data = [] ): WP_REST_Response
    {
	    $data = !empty($ajax_data) ? $ajax_data : $request->get_json_params();
	    $data = $data['data'] ?? [];
        //de api registration
        $this->update_option('tips-and-tricks', (bool) ( $data['tips-and-tricks'] ));

        return $this->response([
            'message' => __('Success', 'simplybook'),
        ]);
    }


    /**
     * Register the company with Simplybookme
     *
     * @param $request
     * @param array $ajax_data
     * @return WP_REST_Response
     */
    public function register_company($request, $ajax_data = [] ): WP_REST_Response
    {
	    $data = !empty($ajax_data) ? $ajax_data : $request->get_json_params();
	    $data = $data['data'] ?? [];
		error_log("company registration response");
		error_log(print_r($data, true));
        //de api registration
        $this->update_option('email', sanitize_email( $data['email']) );
        $this->update_option('category', (int) ( $data['business-category'] ));
        $this->update_option('company_name', sanitize_text_field($data['company-name']) );
		//get a description using the wordpress get_bloginfo function
        $description = get_bloginfo('description');
        $this->update_option('description', sanitize_text_field($description) );
        $this->update_option('phone',  sanitize_text_field($data['phone']) );
        $this->update_option('city',  sanitize_text_field($data['city']) );
        $this->update_option('address',  sanitize_text_field($data['address']) );
	    //no spaces allowed in zip
	    $zip = sanitize_text_field( str_replace(' ', '', trim( $data['zip'] ) ) );
        $this->update_option('zip', $zip );


		$this->api->register_company();

        return $this->response([
            'message' => __('Success', 'simplybook'),
        ]);
    }

	public function get_recaptcha_sitekey(): WP_REST_Response {
		return $this->response([
			'site_key' => get_option('simplybook_recaptcha_site_key'),
		]);
	}


	public function confirm_email($request, $ajax_data = [] ): WP_REST_Response
	{
		$data = !empty($ajax_data) ? $ajax_data : $request->get_json_params();
		$data = $data['data'] ?? [];
		error_log("email confirmation response");
		error_log(print_r($data, true));

		update_option('simplybook_confirmation_code', (int) $data['confirmation-code']);
		update_option('simplybook_recaptcha_token', sanitize_text_field( $data['recaptchaToken']) );

		return $this->response([
			'message' => __('Success', 'simplybook'),
		]);
	}
}
