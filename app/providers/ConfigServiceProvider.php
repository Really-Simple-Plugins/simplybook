<?php

namespace SimplyBook\Providers;

use SimplyBook\Support\Helpers\Storage;

class ConfigServiceProvider extends Provider
{
    protected array $provides = [
        'env',
        'config',
    ];

    /**
     * Provides the environment data in the container.
     * @example $this->app->env->getString('plugin.features_path')
     */
    public function provideEnv(): Storage
    {
        $env = new Storage(
            require dirname(__FILE__, 3).'/config/env.php'
        );

        if ($env->isNotEmpty('simplybook.api')) {
            $env = $this->exposeCorrectSimplyBookEnvironment($env);
        }

        if ($env->isNotEmpty('simplybook.domains')) {
            $env = $this->addStagingSimplybookDomainToDomains($env);
        }

        return $env;
    }

    /**
     * Provides all config files from /config in the container, EXCEPT the env
     * file!
     * @example All: $this->app->config->get()
     * @example Name: $this->app->config->getString('env.plugin.name')
     */
    public function provideConfig(): Storage
    {
        return $this->storageFromPath(dirname(__FILE__, 3).'/config', ['env'], true);
    }

    /**
     * Provides the SimplyBook API environment configuration based on the
     * value of the SIMPLYBOOK_ENV constant.
     */
    private function exposeCorrectSimplyBookEnvironment(Storage $config): Storage
    {
        $acceptedEnvs = ['production', 'development'];
        $env = defined('SIMPLYBOOK_ENV') ? SIMPLYBOOK_ENV : 'production';

        if (!in_array($env, $acceptedEnvs)) {
            $env = 'production';
        }

        $correctEnv = $config->get('simplybook.api.' . $env);
        $config->set('simplybook.api', $correctEnv);

        return $config;
    }

    /**
     * Provides the SimplyBook domains based on the current environment.
     * If in development mode, it adds the staging domain.
     * @example $this->app->simplybook_domains
     */
    public function addStagingSimplybookDomainToDomains(Storage $config): Storage
    {
        $env = defined('SIMPLYBOOK_ENV') ? SIMPLYBOOK_ENV : 'production';

        $environmentData = $config->get('simplybook.api');
        $domains = $config->get('simplybook.domains');

        if (($env === 'development') && !empty($environmentData['domain'])) {
            $domains[] = [
                'value' => 'default:' . $environmentData['domain'],
                'label' => $environmentData['domain'],
            ];
            $config->set('simplybook.domains', $domains);
        }

        return $config;
    }

    /**
     * Return all config files as Storage. If path is a directory, it will
     * merge all the files in the directory.
     *
     * @param bool $prefixWithFileName Can be used to prefix the keys with the
     * filename when loading a directory. Can be useful to bundle the config
     * data of a file under the filename which makes it easier to retrieve a
     * single fields config.
     *
     * @throws \InvalidArgumentException
     */
    private function storageFromPath(string $path, array $whitelist = [], bool $prefixWithFileName = false): Storage
    {
        if (!file_exists($path)) {
            throw new \InvalidArgumentException(
                'Unloadable configuration file ' . esc_html($path) . ' provided.'
            );
        }

        $data = [];

        if (is_dir($path)) {
            $root = rtrim((string) realpath($path), DIRECTORY_SEPARATOR);

            // Also loads files in nested dirs.
            $iterator = new \RecursiveIteratorIterator(
                new \RecursiveDirectoryIterator($root, \FilesystemIterator::SKIP_DOTS)
            );

            /** @var \SplFileInfo $file */
            foreach ($iterator as $file) {
                if (!$file->isFile() || in_array($file->getBasename('.php'), $whitelist)) {
                    continue;
                }

                $pathname = $file->getPathname();
                $extension = strtolower((string) pathinfo($pathname, PATHINFO_EXTENSION));

                if ($extension !== 'php') {
                    continue;
                }

                $fileData = require $pathname;
                if (!is_array($fileData)) {
                    continue;
                }

                $fileName = (string) pathinfo($pathname, PATHINFO_FILENAME);
                $fileDirPath = $file->getPath();

                // Compute the directory relative to the root and take the last
                // segment as the prefix.
                $relativeDir = ltrim(substr($fileDirPath, strlen($root)), DIRECTORY_SEPARATOR);
                $dirKey = ($relativeDir !== '' ? basename($relativeDir) : null);

                if ($prefixWithFileName) {
                    if ($dirKey !== null) {
                        // Group by immediate subdirectory, then filename. Deep
                        // merge so multiple files in the same subdir accumulate
                        $data[$dirKey] = array_replace_recursive(
                            $data[$dirKey] ?? [],
                            [$fileName => $fileData]
                        );
                    } else {
                        // Top-level files keyed by filename.
                        $data = array_replace_recursive($data, [
                            $fileName => $fileData
                        ]);
                    }
                } else {
                    // No prefixing: merge raw file data (deep) to avoid losing
                    // previously merged keys.
                    $data = array_replace_recursive($data, $fileData);
                }
            }
        } else {
            $loaded = require $path;
            if (is_array($loaded)) {
                $data = $loaded;
            }
        }

        return new Storage($data);
    }


}
