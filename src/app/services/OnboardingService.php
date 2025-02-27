<?php namespace SimplyBook\App\Services;

use Simplybook_old\Traits\Save;
use Simplybook_old\Traits\Helper;
use SimplyBook\Utility\StringUtility;

class OnboardingService extends HttpService
{
    use Helper;
    use Save;

    /**
     * Register a user with email address with SimplyBook.me
     *
     * @param $request
     * @param [] $ajax_data
     * @return \WP_REST_Response
     */
    public function registerEmail($request, $ajaxData = []): \WP_REST_Response
    {
        sleep ( 1 );

        $parameters = $this->retrieveRestParameters($request, $ajaxData);
        $parameters = $parameters['data'] ?? [];
        
        error_log(print_r($parameters, true));
        $terms_and_conditions = (bool) $parameters['terms-and-conditions'];
        $email = sanitize_email( $parameters['email'] );
        $this->update_option('email', $email );
        $this->update_option('terms-and-conditions',  $terms_and_conditions);
        $success = is_email( $email ) && $terms_and_conditions;
        $message = $success ? '' : __('Please enter a valid email address and accept the terms and conditions', 'simplybook');
        return $this->sendRestResponse([], $success, $message );
    }

    /**
     * Register a user with email address with SimplyBook.me
     *
     * @param $request
     * @param array $ajax_data
     * @return \WP_REST_Response
     */
    public function tipsAndTricks($request, array $ajaxData = []): \WP_REST_Response
    {
        $parameters = $this->retrieveRestParameters($request, $ajaxData);
        $parameters = $parameters['data'] ?? [];
        $this->update_option('tips-and-tricks', (bool) ( $parameters['tips-and-tricks'] ));
        return $this->sendRestResponse();
    }


    /**
     * Register the company with Simplybookme
     *
     * @param $request
     * @param array $ajax_data
     * @return \WP_REST_Response
     */
    public function registerCompany($request, $ajaxData = []): \WP_REST_Response
    {
        $parameters = $this->retrieveRestParameters($request, $ajaxData);
        $parameters = $parameters['data'] ?? [];
        error_log("company registration response");
        error_log(print_r($parameters, true));
        //de api registration
        $this->update_option('email', sanitize_email( $parameters['email']) );
        $this->update_option('category', (int) ( $parameters['category'] ));
        $this->update_option('company_name', sanitize_text_field($parameters['company_name']) );
        $this->update_option('phone',  sanitize_text_field($parameters['phone']) );
        $this->update_option('city',  sanitize_text_field($parameters['city']) );
        $this->update_option('address', sanitize_text_field($parameters['address']) );
        $this->update_option('service', sanitize_text_field($parameters['service']) );
        $this->update_option('country', $this->sanitize_country($parameters['country']) );
        //no spaces allowed in zip
        $zip = sanitize_text_field( trim( $parameters['zip'] ) );
        $this->update_option('zip', $zip );
        $response = $this->api->register_company();

        //store step, to start with on return of user.
        $step = ( $response->success ) ? 3 : 1;
        update_option("simplybook_completed_step", $step, false );
        return $this->sendRestResponse( [], $response->success, $response->message );
    }

    /**
     * Get the recaptcha site key
     * @return \WP_REST_Response
     */
    public function getRecaptchaSitekey(): \WP_REST_Response {
        return $this->sendRestResponse([
            'site_key' => get_option('simplybook_recaptcha_site_key'),
        ]);
    }

    public function confirmEmail($request, $ajaxData = []): \WP_REST_Response
    {
        $parameters = $this->retrieveRestParameters($request, $ajaxData);
        $parameters = $parameters['data'] ?? [];
        error_log("email confirmation response");
        error_log(print_r($parameters, true));

        $response = $this->api->confirm_email((int) $parameters['confirmation-code'], sanitize_text_field( $parameters['recaptchaToken']));
        $step = ( $response->success ) ? 4 : 3;
        update_option("simplybook_completed_step", $step, false );
        error_log("email confirmation completed");
        return $this->sendRestResponse([], $response->success, $response->message);
    }

    /**
     * Generate default shortcode pages
     * @param $request
     * @param $ajax_data
     *
     * @return \WP_REST_Response
     */
    public function isPageTitleAvailable($request, $ajaxData = []): \WP_REST_Response
    {
        $parameters = $this->retrieveRestParameters($request, $ajaxData);
        $parameters = $parameters['data'] ?? [];
        $title = StringUtility::convertUrlToTitle(sanitize_text_field($parameters['title']));
        error_log("check $title");
        $args = array(
            'post_type'  => 'page',
            'title'      => sanitize_text_field($title),
            'post_status' => 'publish',
        );

        $posts = get_posts($args);
        error_log(print_r($posts, true));
        return $this->sendRestResponse([], empty($posts), '');
    }

    /**
     * Generate default shortcode pages
     * @param $request
     * @param $ajax_data
     *
     * @return \WP_REST_Response
     */
    public function generatePages($request, $ajaxData = []): \WP_REST_Response
    {
        $parameters = $this->retrieveRestParameters($request, $ajaxData);
        $parameters = $parameters['data'] ?? [];
        $calendar_pagename = StringUtility::convertUrlToTitle($parameters['calendarPageName']);
        $booking_pagename = StringUtility::convertUrlToTitle($parameters['bookingPageName']);

        $success_calendar = $this->create_page($calendar_pagename, '[simplybook_widget]');
        $success_booking = $this->create_page($booking_pagename, '[simplybook_booking_button]');
        error_log("page generation completed");
        return $this->sendRestResponse([], $success_calendar!==-1 && $success_booking!==-1, '');
    }
}