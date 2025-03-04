<?php
namespace SimplyBook\App\Endpoints;

use SimplyBook\App;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use Simplybook_old\Admin\Installer\Installer;
use SimplyBook\App\Services\OtherPluginService;
use SimplyBook\Interfaces\MultiEndpointInterface;

class OtherPluginEndpoints implements MultiEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'other_plugins_data';

    private OtherPluginService $service;

    public function __construct(OtherPluginService $service)
    {
        $this->service = $service;
    }

    /**
     * Always enabled
     */
    public function enabled(): bool
    {
        return true;
    }

    /**
     * @inheritDoc
     */
    public function registerRoutes(): array
    {
        return [
            'other_plugins_data' => [
                'methods' => \WP_REST_Server::CREATABLE,
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
        $slug = $storage->getString('slug');
        $action = $storage->getString('action');

        $installer = new Installer($slug);
        $installer->install($action);

        $plugins = $this->buildRelatedPluginData();

        //get the plugin with slug $slug
        $plugin = array_filter($plugins, function($plugin) use ($slug){
            return $plugin['slug'] === $slug;
        });
        //get the first element
        $plugin = reset($plugin);

        return $this->sendHttpResponse([
            'plugin' => $plugin
        ]);
    }

    /**
     * Get related plugins from the related config and manipulate the array
     * with the Installer class.
     */
    public function buildRelatedPluginData(): array
    {
        $plugins = App::related('plugins');

        foreach ($plugins as $index => $plugin) {
            $installer = new Installer($plugin['slug']);

            $this->service->setPluginConfig($plugin);
            $plugins[$index]['url'] = $this->service->getPluginUrl();
            $plugins[$index]['action'] = $this->service->getAvailablePluginAction();

            if (isset($plugin['constant_premium']) && defined($plugin['constant_premium'])) {
                $plugins[$index]['action'] = 'installed';
            } elseif (!$installer->plugin_is_downloaded() && !$installer->plugin_is_activated()) {
                $plugins[$index]['action'] = 'download';
            } elseif ($installer->plugin_is_downloaded() && !$installer->plugin_is_activated()) {
                $plugins[$index]['action'] = 'activate';
            } else { // free is active, but not premium.
                //
                $plugins[$index]['url'] = $plugin['upgrade_url'];
                if (isset($plugin['constant_premium']) && defined($plugin['constant_premium'])) {
                    $plugins[$index]['action'] = 'upgrade-to-premium';
                } else {
                    $plugins[$index]['action'] = 'installed';
                }
            }
        }

        return $plugins;
    }
}