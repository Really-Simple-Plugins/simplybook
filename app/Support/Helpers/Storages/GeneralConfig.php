<?php

declare(strict_types=1);

namespace SimplyBook\Support\Helpers\Storages;

use SplFileInfo;
use FilesystemIterator;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;
use SimplyBook\Support\Helpers\Storage;
use SimplyBook\Support\Helpers\DeferredObject;

/**
 * General config helper used in DI container.
 *
 * @mixin Storage This class acts as a proxy to Storage. All method calls are
 * resolved dynamically through {@see DeferredObject::__get()}
 */
final class GeneralConfig extends DeferredObject
{
    private array $filesToSkip = [
        'env', // EnvironmentConfig
    ];

    /**
     * @inheritDoc
     */
    protected function deferredClassString(): string
    {
        return Storage::class;
    }

    /**
     * @inheritDoc
     */
    protected function deferredConstructArguments(): array
    {
        return [
            'items' => $this->loadAllConfigFiles(),
        ];
    }

    /**
     * Return all config files as items for the GeneralConfig.
     */
    private function loadAllConfigFiles(): array
    {
        $configDirectoryPath = rtrim((string) realpath(
            dirname(__FILE__, 5) . '/config'
        ), DIRECTORY_SEPARATOR);

        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($configDirectoryPath, FilesystemIterator::SKIP_DOTS)
        );

        $data = [];

        /** @var SplFileInfo $file */
        foreach ($iterator as $file) {
            $data = $this->appendFileData($file, $data, $configDirectoryPath);
        }

        return $data;
    }

    /**
     * Method is used for collecting a single config file into the full config
     * structure. Invalid files and empty config payloads are ignored so the loop
     * can stay small and focused.
     */
    private function appendFileData(SplFileInfo $file, array $data, string $configDirectoryPath): array
    {
        if (!$file->isFile() || in_array($file->getBasename('.php'), $this->filesToSkip, true)) {
            return $data;
        }

        [$subdirectoryName, $fileName, $fileData] = $this->getFileInfo($file, $configDirectoryPath);
        if ($fileData === []) {
            return $data;
        }

        if ($subdirectoryName === null) {
            return array_replace_recursive($data, [
                $fileName => $fileData,
            ]);
        }

        $data[$subdirectoryName] = array_replace_recursive(
            $data[$subdirectoryName] ?? [],
            [$fileName => $fileData]
        );

        return $data;
    }

    /**
     * Return information about the given file. It will return an array
     * containing the name of the subdirectory the file is in, the name
     * of the file and the data that the config file contains.
     *
     * @return array [subdirectoryName, fileNameFromPath, fileData]
     */
    private function getFileInfo(SplFileInfo $file, string $configDirectoryPath): array
    {
        $pathname = $file->getPathname();
        $fileNameFromPath = (string) pathinfo($pathname, PATHINFO_FILENAME);

        $rawSubdirectory = ltrim(substr($file->getPath(), strlen($configDirectoryPath)), DIRECTORY_SEPARATOR);
        $subdirectoryName = ($rawSubdirectory !== '' ? basename($rawSubdirectory) : null);

        return [
            $subdirectoryName,
            $fileNameFromPath,
            $this->getConfigFileData($pathname),
        ];
    }

    /**
     * Require the config file and return its contents as an array. Works only
     * for PHP files.
     */
    private function getConfigFileData(string $pathname): array
    {
        $extension = strtolower((string) pathinfo($pathname, PATHINFO_EXTENSION));

        if ($extension !== 'php') {
            return [];
        }

        $fileData = require $pathname;
        return (is_array($fileData) ? $fileData : []);
    }
}
