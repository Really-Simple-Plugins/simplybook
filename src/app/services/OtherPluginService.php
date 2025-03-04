<?php

namespace SimplyBook\App\Services;

use SimplyBook\Helpers\Storage;

class OtherPluginService
{
    protected Storage $pluginConfig;

    public function setPluginConfig(array $pluginConfig)
    {
        $this->pluginConfig = new Storage($pluginConfig);
    }

    public function getPluginUrl(): string
    {
        return $this->pluginConfig->getUrl('url');
    }

    public function getAvailablePluginAction(): string
    {
        if ($this->premiumPluginIsInstalled()) {
            return 'installed';
        }

        if ($this->pluginIsDownloadable()) {
            return 'download';
        }

        if ($this->pluginCanBeActivated()) {
            return 'activate';
        }

        // todo: upgrade-to-premium
        // todo: installed

        return 'unknown';
    }

    protected function premiumPluginIsInstalled(): bool
    {
        return $this->pluginConfig->has('constant_premium') && defined($this->pluginConfig->getString('constant_premium'));
    }

    protected function pluginIsDownloadable(): bool
    {
        return $this->pluginFileExists() === false;
    }

    protected function pluginCanBeActivated(): bool
    {
        return $this->pluginFileExists() && ($this->pluginIsActive() === false);
    }

    protected function pluginFileExists(): bool
    {
        return file_exists(trailingslashit(WP_PLUGIN_DIR).$this->pluginConfig->getString('activation_slug'));
    }

    public function pluginIsActive(): bool {
        return is_plugin_active($this->pluginConfig->getString('activation_slug'));
    }

}