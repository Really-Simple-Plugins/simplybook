<?php

declare(strict_types=1);

namespace SimplyBook\Managers;

/**
 * The AbstractDynamicManager provides a base for managers that need to
 * dynamically find and register classes (features, abilities, etc) from
 * specific directories. Child classes must implement methods to
 *  provide the dynamic lookup path, namespace, and root class resolution.
 *
 * It differs from the standard AbstractManager by focusing on dynamic
 * discovery and registration of classes based on the file system structure.
 */
abstract class AbstractDynamicManager extends AbstractManager
{
    /**
     * Internal key to recognize "Pro" classes/directories. Can be ignored when
     * building the namespace and class names. Just adding a "Pro" folder in
     * the dynamic lookup path is enough to mark classes as Pro-only.
     */
    private const PRO_KEY_HANDLE = 'Pro:';

    /**
     * Should return the filesystem path where dynamic classes are located.
     */
    abstract protected function getDynamicLookupPath(): string;

    /**
     * Should return the base namespace for the dynamic classes.
     */
    abstract protected function getDynamicNamespace(): string;

    /**
     * Should return the fully qualified class name for the root class
     * based on the provided namespaced prefix. Should be the root class that
     * boots the dynamic functionality.
     *
     * @param string $namespacedPrefix The namespaced class prefix, example:
     * - "SimplyBook\Path\Example\Example".
     * - "SimplyBook\Path\Pro\AdvancedExample\AdvancedExample".
     *
     * @return string The fully qualified root class name, example:
     * - "SimplyBook\Path\Example\ExampleThing".
     * - "SimplyBook\Path\Pro\AdvancedExample\AdvancedExampleLoader".
     */
    abstract protected function getFullQualifiedRootClass(string $namespacedPrefix): string;

    /**
     * Find and register all dynamic classes from the specified directory.
     * @throws \ReflectionException
     */
    final public function findAndRegister(): void
    {
        $this->beforeFindAndRegister();

        $this->register(
            $this->getRootClasses()
        );

        $this->afterFindAndRegister();
    }

    /**
     * Hook method called before finding and registering dynamic classes.
     * Child classes can override to add pre-processing logic.
     */
    protected function beforeFindAndRegister(): void
    {
    }

    /**
     * Hook method called after finding and registering dynamic classes.
     * Child classes can override to add post-processing logic.
     */
    protected function afterFindAndRegister(): void
    {
    }

    /**
     * Dynamically build and then return an array of fully qualified class names
     * that are saved in the dynamic lookup path provided by the child class.
     *
     * Example:
     *
     *      // Example return value from child class:
     *      protected function getDynamicLookupPath()
     *      {
     *          return 'app/Path/'; (example, you should return a filesystem path)
     *      }
     *
     *      // Example return value from child class:
     *      protected function getDynamicNamespace()
     *      {
     *          return 'SimplyBook\Path';
     *      }
     *
     *      // Resulting return value from this method, given the following
     *      // directory structure:
     *
     *      // app/Path/
     *      // ├── Example
     *      // │   └── ExampleThing.php
     *      // └── Pro
     *      //     └── AdvancedExample
     *      //         └── AdvancedExampleThing.php
     *
     *      return [
     *          'SimplyBook\Path\Example\ExampleThing',
     *          'SimplyBook\Path\Pro\AdvancedExample\AdvancedExampleThing',
     *      ]
     */
    private function getRootClasses(): array
    {
        $classTitles = $this->getClassTitlesDynamically();
        $fullyQualifiedClasses = [];

        foreach ($classTitles as $title) {
            $namespacedPrefix = $this->getNamespacedClassPrefix($title);
            $rootClass = $this->getFullQualifiedRootClass($namespacedPrefix);

            if ($this->isFullDirectoryRegistrable($rootClass, $namespacedPrefix)) {
                $fullyQualifiedClasses[] = $rootClass;
            }
        }

        return $fullyQualifiedClasses;
    }

    /**
     * Method finds all directory names in the dynamic lookup path. If a "Pro"
     * directory is found, it will look for subdirectories within it and prefix
     * their names with {@see PRO_KEY_HANDLE}. This prefix is handled later
     * when building the fully qualified class names via
     * {@see getNamespacedClassPrefix()}.
     */
    private function getClassTitlesDynamically(): array
    {
        $dynamicFileNames = [];

        $dynamicPath = $this->getDynamicLookupPath();
        foreach (new \DirectoryIterator($dynamicPath) as $fileInfo) {
            if ($fileInfo->isDot() || !$fileInfo->isDir()) {
                continue;
            }

            $proEnabled = $this->env->getBoolean('plugin.pro');
            $skipPro = ($proEnabled === false && $fileInfo->getFilename() === 'Pro');
            if ($skipPro) {
                continue;
            }

            if ($fileInfo->getFilename() === 'Pro') {
                foreach (new \DirectoryIterator($fileInfo->getPathname()) as $proInfo) {
                    if ($proInfo->isDot() || !$proInfo->isDir()) {
                        continue;
                    }
                    $dynamicFileNames[] = self::PRO_KEY_HANDLE . $proInfo->getFilename();
                }
                continue;
            }

            $dynamicFileNames[] = $fileInfo->getFilename();
        }

        return $dynamicFileNames;
    }

    /**
     * Build the namespaced class prefix based on the provided title.
     * Example: "ExampleThing" => "SimplyBook\Path\ExampleThing\".
     * @return string The namespaced class prefix, or an empty string if the
     * directory corresponding to the namespace doesn't exist or Pro is
     * required but not installed.
     */
    private function getNamespacedClassPrefix(string $title): string
    {
        $needsPro = strpos($title, self::PRO_KEY_HANDLE) !== false;
        if ($needsPro && !$this->env->getBoolean('plugin.pro')) {
            return ''; // Pro not installed, abort
        }

        if ($needsPro) {
            $title = substr($title, strlen(self::PRO_KEY_HANDLE));
        }

        $directoryPath = $this->getDirectoryPathFromTitle($title, $needsPro);
        if (!is_dir($directoryPath)) {
            return ''; // Directory doesn't exist, abort
        }

        return $this->getDirectoryNamespace($title, $needsPro) . $title;
    }

    /**
     * Get the directory path based on the given directory name and whether
     * it needs the Pro version.
     */
    private function getDirectoryPathFromTitle(string $directoryName, bool $needsPro = false): string
    {
        $parts = [
            untrailingslashit($this->getDynamicLookupPath()),
            ($needsPro ? 'Pro' : null),
            $directoryName,
        ];

        return implode(DIRECTORY_SEPARATOR, array_filter($parts)) . DIRECTORY_SEPARATOR;
    }

    /**
     * Get the directory namespace based on the given directory name and
     * whether it needs the Pro version. Used {@see getDynamicNamespace()}
     * that should be implemented by the child class.
     */
    private function getDirectoryNamespace(string $directoryName, bool $needsPro = false): string
    {
        $namespacesPath = rtrim($this->getDynamicNamespace(), '\\');
        return $namespacesPath . '\\' . ($needsPro ? 'Pro\\' : '') . $directoryName . '\\';
    }

    /**
     * Child class can override to add additional checks before registering the
     * classes in the given directory. By default, it only checks if the root
     * class exists. Optionally the namespaced prefix is provided for more
     * complex checks.
     *
     * @param string $fqRootClass The fully qualified root class name
     * provided via child through {@see getFullQualifiedRootClass()}.
     *
     * @param string $namespacedPrefix The namespaced class prefix built via
     * child through {@see getNamespacedClassPrefix()}.
     *
     * @return bool True if the directory is registrable, false otherwise. If
     * `false` is wrongly returned, do: `composer dump-autoload` to refresh
     * the autoloader.
     */
    protected function isFullDirectoryRegistrable(string $fqRootClass, string $namespacedPrefix): bool
    {
        if (class_exists($fqRootClass) === false) {
            return false;
        }

        return true;
    }
}
