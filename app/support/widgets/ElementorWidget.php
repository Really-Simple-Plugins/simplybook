<?php
namespace SimplyBook\Widgets;

use Elementor\Controls_Manager;
use Elementor\Widget_Base;
use SimplyBook\App;
use SimplyBook\Traits\HasApiAccess;
use SimplyBook\Http\Entities\Service;
use SimplyBook\Http\Entities\ServiceProvider;

class ElementorWidget extends Widget_Base
{
    use HasApiAccess;

	private const NAME = 'simplybook_widget';

	/**
	 * Default value for the dropdowns to indicate no selection
	 * @var string
	 */
    private const DEFAULT_VALUE = '0';

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

        if (!$this->companyRegistrationIsCompleted()) {
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
                'default' => self::DEFAULT_VALUE,
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
                'default' => self::DEFAULT_VALUE,
                'options' => $this->getProvidersOptions(),
            ]
        );
    }

    /**
     * Location dropdown - shows helpful text when feature disabled.
     */
    private function addLocationControl(): void
    {
        $client = App::provide('client');
        if (!$client || !$client->isSpecialFeatureEnabled('location')) {
            return;
        }

        $this->add_control(
            'location',
            [
                'label' => esc_html__('Location', 'simplybook'),
                'type' => Controls_Manager::SELECT,
                'default' => self::DEFAULT_VALUE,
                'options' => $this->getLocationsOptions(),
            ]
        );
    }

    /**
     * Category dropdown - shows helpful text when feature disabled.
     */
    private function addServiceCategoryControl(): void
    {
        $client = App::provide('client');
        if (!$client || !$client->isSpecialFeatureEnabled('event_category')) {
            return;
        }

        $this->add_control(
            'category',
            [
                'label' => esc_html__('Service Category', 'simplybook'),
                'type' => Controls_Manager::SELECT,
                'default' => self::DEFAULT_VALUE,
                'options' => $this->getServiceCategoriesOptions(),
            ]
        );
    }

    /**
     * Fetches services from API with error handling.
     */
    private function getServicesOptions(): array
    {
        if (!$this->companyRegistrationIsCompleted()) {
            return []; // we shouldn't be here
        }

        $serviceEntity = new Service();

        return $this->buildOptionsFromApiData(
            $serviceEntity->all(),
            esc_html__('Select a service', 'simplybook')
        );
    }

    /**
     * Fetches providers from API, includes 'Any' option when available.
     */
    private function getProvidersOptions(): array
    {
        if (!$this->companyRegistrationIsCompleted()) {
            return []; // we shouldn't be here
        }

        $providerEntity = new ServiceProvider();

        $options = $this->buildOptionsFromApiData(
            $providerEntity->all(),
            esc_html__('Select a service provider', 'simplybook')
        );

        // Return early if "Any Provider" feature is not enabled
        if (App::provide('client')->isSpecialFeatureEnabled('any_unit') === false) {
            return $options;
        }

        // Insert 'any' option after the default option
        $defaultOption = array_slice($options, 0, 1, true);
        $restOptions = array_slice($options, 1, null, true);
        return $defaultOption + ['any' => esc_html__('Any provider', 'simplybook')] + $restOptions;
    }

    /**
     * Returns locations only if Multiple Locations feature is active.
     */
    private function getLocationsOptions(): array
    {
        if (!$this->companyRegistrationIsCompleted() || !App::provide('client')->isSpecialFeatureEnabled('location')) {
            return []; // we shouldn't be here
        }

        $locations = App::provide('client')->getLocations(true);
        return $this->buildOptionsFromApiData(
            is_array($locations) ? $locations : [],
            esc_html__('Select a location', 'simplybook')
        );
    }

    /**
     * Returns categories only if Service Categories feature is active.
     */
    private function getServiceCategoriesOptions(): array
    {
        if (!$this->companyRegistrationIsCompleted() || !App::provide('client')->isSpecialFeatureEnabled('event_category')) {
            return []; // we shouldn't be here
        }

        $categories = App::provide('client')->getCategories(true);
        return $this->buildOptionsFromApiData(
            is_array($categories) ? $categories : [],
            esc_html__('Select a category', 'simplybook')
        );
    }

    /**
     * Filters widget settings to only include valid SimplyBook shortcode parameters.
     * Parameters must match the controls we register in {@see add_controls()}.
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
     * Generic method to build options array from API data.
     *
     * @param array $items API response items
     * @param string $defaultLabel Default option label
     */
    private function buildOptionsFromApiData(array $items, string $defaultLabel): array
    {
        $options = [
            self::DEFAULT_VALUE => $defaultLabel,
        ];

        foreach ($items as $item) {
            if (isset($item['id']) && isset($item['name'])) {
                $options[$item['id']] = esc_html($item['name']);
            }
        }

        return $options;
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
            esc_html__('Go to the SimplyBook.me dashboard', 'simplybook')
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