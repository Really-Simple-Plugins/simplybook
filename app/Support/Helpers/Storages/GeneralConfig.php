<?php

declare(strict_types=1);

namespace SimplyBook\Support\Helpers\Storages;

use SimplyBook\Support\Helpers\Storage;

/**
 * General config helper used in DI container.
 */
final class GeneralConfig extends Storage
{
    private array $filesToSkip = [
        'env', // EnvironmentConfig
    ];

    public function __construct()
    {
        parent::__construct(
            $this->storageFromPath(dirname(__FILE__, 5) . '/config', $this->filesToSkip, true)
        );
    }

    /**
     * Return all config files as GeneralConfig. If path is a directory, it will
     * merge all the files in the directory.
     *
     * @param bool $prefixWithFileName Can be used to prefix the keys with the
     * filename when loading a directory. Can be useful to bundle the config
     * data of a file under the filename which makes it easier to retrieve a
     * single fields config.
     *
     * @throws \InvalidArgumentException
     */
    private function storageFromPath(string $path, array $skip = [], bool $prefixWithFileName = false): array
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
                if (!$file->isFile() || in_array($file->getBasename('.php'), $skip)) {
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

        return $data;
    }
}
