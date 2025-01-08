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
        $this->update_option('tips-and-tricks', (bool) ( $data['tips-and-tricks'] ));

        return $this->response();
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
        $this->update_option('category', (int) ( $data['category'] ));
        $this->update_option('company_name', sanitize_text_field($data['company_name']) );
        $this->update_option('phone',  sanitize_text_field($data['phone']) );
        $this->update_option('city',  sanitize_text_field($data['city']) );
        $this->update_option('address', sanitize_text_field($data['address']) );
        $this->update_option('service', sanitize_text_field($data['service']) );
        $this->update_option('country', $this->sanitize_country($data['country']) );
	    //no spaces allowed in zip
	    $zip = sanitize_text_field( trim( $data['zip'] ) );
        $this->update_option('zip', $zip );
		$response = $this->api->register_company();
        return $this->response( [], $response->status, $response->message );
    }

	/**
	 * Get the recaptcha site key
	 * @return WP_REST_Response
	 */
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

		$response = $this->api->confirm_email((int) $data['confirmation-code'], sanitize_text_field( $data['recaptchaToken']));
		error_log("email confirmation completed");
		return $this->response([], $response->status, $response->message);
	}
}
