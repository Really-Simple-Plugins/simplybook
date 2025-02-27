<?php
namespace SimplyBook\App;

use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\App\Services\OnboardingService;

// todo - If we get more controllers like this, maybe move to a Http namespace?
class OnboardingController implements ControllerInterface
{
    private OnboardingService $service;

    public function __construct(OnboardingService $service)
    {
        $this->service = $service;
    }

    public function register()
    {
        add_filter('simplybook_rest_routes', [$this, 'addRoutes']);
    }

    public function addRoutes(array $routes): array
    {
        $routes['onboarding/register_email'] = [
            'methods' => 'POST',
            'callback' => [$this->service, 'registerEmail'],
        ];

        $routes['onboarding/tipstricks'] = [
            'methods' => 'POST',
            'callback' => [$this->service, 'tipsAndTricks'],
        ];

        $routes['onboarding/company_registration'] = [
            'methods' => 'POST',
            'callback' => [$this->service, 'registerCompany'],
        ];

        $routes['onboarding/get_recaptcha_sitekey'] = [
            'methods' => 'POST',
            'callback' => [$this->service, 'getRecaptchaSitekey'],
        ];

        $routes['onboarding/confirm_email'] = [
            'methods' => 'POST',
            'callback' => [$this->service, 'confirmEmail'],
        ];

        $routes['onboarding/is_page_title_available'] = [
            'methods' => 'POST',
            'callback' => [$this->service, 'isPageTitleAvailable'],
        ];

        $routes['onboarding/generate_pages'] = [
            'methods' => 'POST',
            'callback' => [$this->service, 'generatePages'],
        ];

        return $routes;
    }
}