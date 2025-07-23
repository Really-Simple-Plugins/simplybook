<?php
namespace SimplyBook\Widgets;

use Elementor\Controls_Manager;
use Elementor\Widget_Base;
use SimplyBook\App;
use SimplyBook\Traits\IsAuthorized;

class ElementorWidget extends Widget_Base
{
    use IsAuthorized;
    
	private const NAME = 'simplybook_widget';
	// Default value for dropdowns, used to indicate no selection
    private const OPTION_VALUE = '0';

    private $client;
    
    /**
     * Required by Elementor for widget registration.
     */
    public function get_name(): string
    {
        return self::NAME;
    }

    /**
     * Shows in the Elementor widget panel.
     */
    public function get_title(): string
    {
        return esc_html__('SimplyBook.me Widget', 'simplybook');
    }

    /**
     * Uses Elementor's icon library (eicon-*).
     */
    public function get_icon(): string
    {
        return 'eicon-calendar';
    }

    /**
     * Helps users find this widget when searching.
     */
    public function get_keywords(): array
    {
        return ['booking', 'calendar', 'appointment', 'SimplyBook.me'];
    }

    /**
     * Registers all widget controls (dropdowns) for the Elementor editor.
     */
    protected function register_controls(): void
    {
        $this->start_controls_section(
            'content_section',
            [
                'label' => esc_html__('SimplyBook.me Settings', 'simplybook'),
                'tab' => Controls_Manager::TAB_CONTENT,
            ]
        );

        if (!$this->IsAuthorized()) {
            $this->addLoginRequiredControl();
        } else {
            $this->addServiceControl();
            $this->addProviderControl();
            $this->addLocationControl();
            $this->addServiceCategoryControl();
        }

        $this->end_controls_section();
    }

    /**
     * Converts widget settings to SimplyBook shortcode and renders it.
     */
    protected function render(): void
    {
        $settings = $this->get_settings_for_display();
        $attributes = $this->buildShortcodeAttributes($settings);
        
        echo do_shortcode($this->buildShortcode($attributes));
    }

    /**
     * Service dropdown - always visible, populated from API.
     */
    private function addServiceControl(): void
    {
        $this->add_control(
            'service',
            [
                'label' => esc_html__('Service', 'simplybook'),
                'type' => Controls_Manager::SELECT,
                'default' => self::OPTION_VALUE,
                'options' => $this->getServicesOptions(),
            ]
        );
    }

    /**
     * Provider dropdown including 'Any provider' when enabled.
     */
    private function addProviderControl(): void
    {
        $this->add_control(
            'provider',
            [
                'label' => esc_html__('Service Provider', 'simplybook'),
                'type' => Controls_Manager::SELECT,
                'default' => self::OPTION_VALUE,
                'options' => $this->getProvidersOptions(),
            ]
        );
    }

    /**
     * Location dropdown - shows helpful text when feature disabled.
     */
    private function addLocationControl(): void
    {

	    $client = $this->getClient();
	    if (!$client->isSpecialFeatureEnabled('locations')) {
		    return;
	    }

	    $this->add_control(
            'location',
            [
                'label' => esc_html__('Location', 'simplybook'),
                'type' => Controls_Manager::SELECT,
                'default' => self::OPTION_VALUE,
                'options' => $this->getLocationsOptions(),
            ]
        );
    }

    /**
     * Category dropdown - shows helpful text when feature disabled.
     */
    private function addServiceCategoryControl(): void
    {

	    $client = $this->getClient();
	    if (!$client->isSpecialFeatureEnabled('event_category')) {
		    return;
	    }

	    $this->add_control(
            'category',
            [
                'label' => esc_html__('Service Category', 'simplybook'),
                'type' => Controls_Manager::SELECT,
                'default' => self::OPTION_VALUE,
                'options' => $this->getServiceCategoriesOptions(),
            ]
        );
    }

    /**
     * Fetches services from API with error handling.
     */
    private function getServicesOptions(): array
    {
        $options = [
            self::OPTION_VALUE => esc_html__('Select a service', 'simplybook'),
        ];

        $client = $this->getClient();
        if (!$client || !$this->isAuthorized()) {
            return $options;
        }

        $services = $client->getServices(true);

        if (!is_array($services)) {
            return $options;
        }

        foreach ($services as $service) {
            if (isset($service['id']) && isset($service['name'])) {
                $options[$service['id']] = esc_html($service['name']);
            }
        }

        return $options;
    }

    /**
     * Fetches providers from API, includes 'Any' option when available.
     */
    private function getProvidersOptions(): array
    {
        $options = [
            self::OPTION_VALUE => esc_html__('Select a provider', 'simplybook'),
        ];

        $client = $this->getClient();
        if (!$client || !$this->isAuthorized()) {
            return $options;
        }

        // Check if "Any Provider" feature is enabled
        if ($client->isSpecialFeatureEnabled('any_unit')) {
            $options['any'] = esc_html__('Any provider', 'simplybook');
        }

        $providers = $client->getProviders(true);
        if (!is_array($providers)) {
            return $options;
        }

        foreach ($providers as $provider) {
            if (isset($provider['id']) && isset($provider['name'])) {
                $options[$provider['id']] = esc_html($provider['name']);
            }
        }

        return $options;
    }

    /**
     * Returns locations only if Multiple Locations feature is active.
     */
    private function getLocationsOptions(): array
    {
        $options = [
            self::OPTION_VALUE => esc_html__('Select a location', 'simplybook'),
        ];

        $client = $this->getClient();
        if (!$client || !$this->isAuthorized()) {
            return $options;
        }

        // Only get locations if the feature is enabled
        if (!$client->isSpecialFeatureEnabled('location')) {
            return $options;
        }

        $locations = $client->getLocations(true);
        if (!is_array($locations)) {
            return $options;
        }

        foreach ($locations as $location) {
            if (isset($location['id']) && isset($location['name'])) {
                $options[$location['id']] = esc_html($location['name']);
            }
        }

        return $options;
    }

    /**
     * Returns categories only if Service Categories feature is active.
     */
    private function getServiceCategoriesOptions(): array
    {
        $options = [
            self::OPTION_VALUE => esc_html__('Select a category', 'simplybook'),
        ];

        $client = $this->getClient();
        if (!$client || !$this->isAuthorized()) {
            return $options;
        }

        // Only get categories if feature is enabled
        if (!$client->isSpecialFeatureEnabled('event_category')) {
            return $options;
        }

        $categories = $client->getCategories(true);
        if (!is_array($categories)) {
            return $options;
        }

        foreach ($categories as $category) {
            if (isset($category['id']) && isset($category['name'])) {
                $options[$category['id']] = esc_html($category['name']);
            }
        }

        return $options;
    }

    /**
     * Filters widget settings to only include valid SimplyBook shortcode parameters.
     * 
     * Must match the controls we registered in this widget (in add_controls() calls)
     */
    private function buildShortcodeAttributes(array $settings): array
    {
        $attributes = [];
        $possibleAttributes = ['service', 'provider', 'location', 'category'];
        
        foreach ($possibleAttributes as $key) {
            $value = $settings[$key] ?? '';
            if (!empty($value)) {
                $attributes[$key] = $value;
            }
        }
        
        return $attributes;
    }

    /**
     * Formats attributes as [simplybook_widget key="value"] string.
     */
    private function buildShortcode(array $attributes): string
    {
        if (empty($attributes)) {
            return '[' . self::NAME . ']';
        }
        
        $attributePairs = array_map(
            fn($key, $value) => sprintf('%s="%s"', sanitize_text_field($key), sanitize_text_field($value)),
            array_keys($attributes),
            array_values($attributes)
        );
        
        return sprintf('[%s %s]', self::NAME, implode(' ', $attributePairs));
    }

    /**
     * Excludes empty and '0' values from shortcode.
     */
    private function isValidOptionValue(string $value): bool
    {
        return !empty($value) && $value !== self::OPTION_VALUE;
    }

    /**
     * Lazy loads and caches the SimplyBook API client.
     */
    private function getClient()
    {
        if ($this->client === null) {
            $this->client = App::provide('client');
        }

        return $this->client;
    }

    /**
     * Shows login required message with dashboard link.
     */
    private function addLoginRequiredControl(): void
    {
        $dashboardUrl = App::env('plugin.dashboard_url');
        $loginMessage = sprintf(
            '%s<br><br><a href="%s" target="_blank">%s</a>',
            esc_html__('Please log in to SimplyBook.me to use this widget.', 'simplybook'),
            esc_url($dashboardUrl),
            esc_html__('Go to SimplyBook.me Dashboard', 'simplybook')
        );
        
        $this->add_control(
            'login_required',
            [
                'type' => Controls_Manager::RAW_HTML,
                'raw' => $loginMessage,
                'content_classes' => 'elementor-panel-alert elementor-panel-alert-warning',
            ]
        );
    }
}