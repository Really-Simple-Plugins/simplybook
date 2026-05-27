<?php

declare(strict_types=1);

namespace SimplyBook\Managers;

use DirectoryIterator;

/**
 * The AbstractDynamicManager provides a base for managers that need to
 * dynamically find and register classes (features, abilities, etc) from
 * specific directories. Child classes must implement methods to
 *  provide the dynamic lookup path, namespace, and root class resolution.
 *
 * It differs from the standard AbstractManager by focusing on dynamic
 * discovery and registration of classes based on the file system structure.
 */
abstract class AbstractDynamicManagerAlt extends AbstractManager
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
    abstract protected function path(): string;

    /**
     * Should return the base namespace for the dynamic classes.
     */
    abstract protected function namespace(): string;

    /**
     * todo
     */
    abstract protected function suffix(): string;

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
     * todo
     */
    private function getRootClasses(): array
    {
        $classTitles = $this->getClassesFromSubDirectories();
        $fullyQualifiedClasses = [];

        foreach ($classTitles as $title) {
            $namespacedPrefix = $this->getNamespacedClassPrefix($title);
            if ($this->isFullDirectoryRegistrable($namespacedPrefix)) {
                $fullyQualifiedClasses[] = $namespacedPrefix;
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
    private function getClassesFromSubDirectories(): array
    {
        $dynamicFileNames = [];
        $proEnabled      = $this->env->getBoolean('plugin.pro');

        foreach (new DirectoryIterator($this->path()) as $fileInfo) {
            if ($fileInfo->isDot() || !$fileInfo->isDir()) {
                continue;
            }

            if ($fileInfo->getFilename() === 'Pro') {
                if ($proEnabled === false) {
                    continue;
                }

                foreach (new DirectoryIterator($fileInfo->getPathname()) as $proInfo) {
                    if ($proInfo->isDot() || !$proInfo->isDir()) {
                        continue;
                    }
                    foreach ($this->findClassFilesInDirectory($proInfo->getPathname()) as $className) {
                        $dynamicFileNames[] = self::PRO_KEY_HANDLE . $proInfo->getFilename() . '\\' . $className;
                    }
                }
                continue;
            }

            foreach ($this->findClassFilesInDirectory($fileInfo->getPathname()) as $className) {
                $dynamicFileNames[] = $fileInfo->getFilename() . '\\' . $className;
            }
        }

        return $dynamicFileNames;
    }

    /**
     * Return the basenames (without `.php`) of every file in the given
     * directory whose name ends with the suffix returned by
     * {@see suffix()}.
     *
     * @return string[]
     */
    private function findClassFilesInDirectory(string $directory): array
    {
        $suffix  = $this->suffix();
        $classes = [];

        foreach (new DirectoryIterator($directory) as $fileInfo) {
            if ($fileInfo->isDot() || !$fileInfo->isFile()) {
                continue;
            }
            if ($fileInfo->getExtension() !== 'php') {
                continue;
            }

            $name = $fileInfo->getBasename('.php');
            if (substr($name, -strlen($suffix)) !== $suffix) {
                continue;
            }

            $classes[] = $name;
        }

        return $classes;
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

        $namespacesPath = rtrim($this->namespace(), '\\');
        return $namespacesPath . '\\' . ($needsPro ? 'Pro\\' : '') . $title;
    }

    /**
     * Child class can override to add additional checks before registering the
     * classes in the given directory. By default, it only checks if the root
     * class exists. Optionally the namespaced prefix is provided for more
     * complex checks.
     *
     * @param string $fqRootClass The fully qualified root class name
     * provided via child through {@see suffix()}.
     *
     * @return bool True if the directory is registrable, false otherwise. If
     * `false` is wrongly returned, do: `composer dump-autoload` to refresh
     * the autoloader.
     */
    protected function isFullDirectoryRegistrable(string $fqRootClass): bool
    {
        if (class_exists($fqRootClass) === false) {
            return false;
        }

        return true;
    }
}
