<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\App;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Services\RelatedPluginService;
use SimplyBook\Interfaces\MultiEndpointInterface;

class RelatedPluginEndpoints implements MultiEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    private RelatedPluginService $service;

    public function __construct(RelatedPluginService $service)
    {
        $this->service = $service;
    }

    /**
     * Only enable this endpoint if the user has access to the admin area
     */
    public function enabled(): bool
    {
        return $this->adminAccessAllowed();
    }

    /**
     * @inheritDoc
     */
    public function registerRoutes(): array
    {
        return [
            'other_plugins_data' => [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'getRelatedPluginsData'],
            ],
            'do_plugin_action' => [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'doRelatedPluginAction'],
            ],
        ];
    }

    /**
     * Get plugin data for other plugin section
     */
    public function getRelatedPluginsData(\WP_REST_Request $request): \WP_REST_Response
    {
        $plugins = $this->buildRelatedPluginData();
        return $this->sendHttpResponse([
            'plugins' => $plugins
        ]);
    }

    /**
     * Perform an action on a plugin
     */
    public function doRelatedPluginAction(\WP_REST_Request $request): \WP_REST_Response
    {
        $storage = $this->retrieveHttpStorage($request);

        $slug = $storage->getString('slug', 'really-simple-ssl');
        $action = $storage->getString('action', 'download');

        $plugins = $this->buildRelatedPluginData($slug);
        $plugin = reset($plugins);

        $this->service->setPluginConfig($plugin);
        $this->service->executeAction($action);

        // After executing the action, a new action should be available
        $plugin['action'] = $this->service->getAvailablePluginAction();

        return $this->sendHttpResponse([
            'plugin' => $plugin
        ]);
    }

    /**
     * Get related plugins from the related config and manipulate the array
     * with the Installer class.
     * @param string $targetPluginSlug Can be used to filter the plugins array
     * for a specific plugin entry based on the slug key.
     */
    public function buildRelatedPluginData(string $targetPluginSlug = ''): array
    {
        $plugins = App::related('plugins');

        if (!empty($targetPluginSlug)) {
            $plugins = array_filter($plugins, function($plugin) use ($targetPluginSlug){
                return isset($plugin['slug']) && ($plugin['slug'] === $targetPluginSlug);
            });
        }

        foreach ($plugins as $index => $plugin) {
            $this->service->setPluginConfig($plugin);
            $plugins[$index]['url'] = $this->service->getPluginUrl();
            $plugins[$index]['action'] = $this->service->getAvailablePluginAction();
        }

        return $plugins;
    }
}