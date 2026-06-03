<?php

declare(strict_types=1);

namespace SimplyBook\Managers;

use LogicException;
use DirectoryIterator;
use ReflectionException;
use SimplyBook\Bootstrap\App;
use SimplyBook\Support\Helpers\Storages\GeneralConfig;
use SimplyBook\Support\Helpers\Storages\EnvironmentConfig;

/**
 * The AbstractDynamicManager provides a base for managers that need to
 * dynamically find and register classes (features, abilities, etc) from
 * specific directories. Child classes must implement methods to
 *  provide the dynamic lookup path, namespace, and root class resolution.
 *
 * It differs from the standard AbstractManager by focusing on dynamic
 * discovery and registration of classes based on the file system structure.
 */
abstract class AbstractManager
{
    /**
     * Internal key to recognize "Pro" classes/directories. Can be ignored when
     * building the namespace and class names. Just adding a "Pro" folder in
     * the dynamic lookup path is enough to mark classes as Pro-only.
     */
    private const PRO_KEY_HANDLE = 'Pro:';

    protected EnvironmentConfig $env;
    protected GeneralConfig $config;

    /**
     * Overwrite this property to true when the entries that the child Manager
     * registers should be added to the container registry. For details see:
     * {@see App::make}
     */
    protected bool $useRegistry = false;

    /**
     * Overwrite this property to true when the dependencies of the entries that
     * the  child Manager registers should be added to the container registry.
     * For details see: {@see App::make}
     */
    protected bool $useRegistryForDependencies = true;

    /**
     * Inject config storage classes
     */
    final public function __construct(EnvironmentConfig $env, GeneralConfig $config)
    {
        $this->env = $env;
        $this->config = $config;
    }

    /**
     * Should return the type of classes found by {@see getRootClasses} and is
     * used in the filter used on the return value of {@see getRootClasses}
     */
    abstract protected function type(): string;

    /**
     * Should return the filesystem path where dynamic classes are located.
     */
    abstract protected function path(): string;

    /**
     * Should return the base namespace for the dynamic classes.
     */
    abstract protected function namespace(): string;

    /**
     * The suffix is used to identify the root class file in the directory. The
     * root class will be registered and used to check if the directory is
     * registrable.
     */
    abstract protected function suffix(): string;

    /**
     * Child class should check if the given class can be registered. For
     * example by checking if it implements an interface to know the logic in
     * the {@see registerClass} method can be executed.
     */
    abstract public function isRegistrable(object $class): bool;

    /**
     * Logic to register the given class. If this method can be executed is
     * checked by the {@see isRegistrable} method.
     */
    abstract public function registerClass(object $class): void;

    /**
     * Method called after all classes given to the manager are registered.
     */
    abstract public function afterRegister(): void;

    /**
     * Find and register all dynamic classes from the specified directory.
     * @throws ReflectionException
     */
    final public function findAndRegister(): void
    {
        $this->beforeFindAndRegister();

        $this->register(
            $this->getRootClasses(),
        );

        $this->afterFindAndRegister();
    }

    /**
     * Register the given class as long as the entries are registrable according
     * to the child managers. Class are autowired, but not registered via
     * {@see App::make}
     *
     * @throws LogicException When a developer is doing it wrong.
     * @throws ReflectionException When the class cannot be loaded.
     */
    public function register(array $classes): void
    {
        foreach ($classes as $fullyClassifiedName) {
            if (is_string($fullyClassifiedName) === false) {
                $type = gettype($fullyClassifiedName);
                throw new LogicException("Class must be a fully qualified name. Given type: $type");
            }

            $class = App::getInstance()->make($fullyClassifiedName, $this->useRegistry, $this->useRegistryForDependencies);

            if ($this->isRegistrable($class) === false) {
                throw new LogicException("Class is not registrable: " . $fullyClassifiedName);
            }

            $this->registerClass($class);
        }

        $this->afterRegister();
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
     * that are saved the {@see path} provided by the child class.
     *
     * Fires filter before return: simplybook_{{@see type}}_classes
     *
     * Example:
     *
     *      // Example return value from ClassnameSuffix class:
     *      protected function path()
     *      {
     *          return 'app/Path/'; // (example, you should return a filesystem path)
     *      }
     *
     *      // Example return value from ClassnameSuffix class:
     *      protected function namespace()
     *      {
     *          return 'SimplyBook\Path\Foobar';
     *      }
     *
     *      // Example return from the ClassnameSuffix class
     *      protected function suffix()
     *      {
     *          return 'Suffix';
     *      }
     *
     *      // Resulting return value from this method, given the following
     *      // directory structure:
     *
     *      // app/Path/
     *      // ├── FooBar
     *      // │   └── ClassnameSuffix.php
     *      // └── Pro
     *      //     └── AdvancedFooBar
     *      //         └── AdvancedExampleSuffix.php
     *
     *      return [
     *          'SimplyBook\Path\ClassnameSuffix',
     *          'SimplyBook\Path\Pro\AdvancedFooBar\AdvancedExampleSuffix',
     *      ]
     */
    private function getRootClasses(): array
    {
        $classTitles = $this->getClassesFromPath(
            $this->path()
        );
        $fullyQualifiedClasses = [];

        foreach ($classTitles as $title) {
            $fullyQualifiedClass = $this->getNamespacedClassPrefix($title);
            if (class_exists($fullyQualifiedClass)) {
                $fullyQualifiedClasses[] = $fullyQualifiedClass;
            }
        }

        return apply_filters("simplybook_{$this->type()}_classes", $fullyQualifiedClasses);
    }

    /**
     * Method finds all directory names in the dynamic lookup path. If a "Pro"
     * directory is found, it will look for subdirectories within it and prefix
     * their names with {@see PRO_KEY_HANDLE}. This prefix is handled later
     * when building the fully qualified class names via
     * {@see getNamespacedClassPrefix()}.
     */
    private function getClassesFromPath(
        string $path,
        string $namespacePrefix = '',
        bool $isProDirectory = false
    ): array {
        $proEnabled = $this->env->getBoolean('plugin.pro');

        $suffix = $this->suffix();
        $classes = [];

        // Abort if given path is empty or does not exist
        if (empty($path) || !file_exists($path)) {
            return $classes;
        }

        foreach (new DirectoryIterator($path) as $fileInfo) {
            if ($fileInfo->isDot()) {
                continue;
            }

            if ($fileInfo->isDir()) {
                $directoryName = $fileInfo->getFilename();

                $childIsProDirectory = ($isProDirectory || $directoryName === 'Pro');

                if ($proEnabled === false && $childIsProDirectory) {
                    continue;
                }

                $childNamespacePrefix = $namespacePrefix . $directoryName . '\\';

                $classes = array_merge(
                    $classes,
                    $this->getClassesFromPath(
                        $fileInfo->getPathname(),
                        $childNamespacePrefix,
                        $childIsProDirectory
                    )
                );

                continue;
            }

            if ($fileInfo->getExtension() !== 'php') {
                continue;
            }

            $name = $fileInfo->getBasename('.php');

            if (substr($name, -strlen($suffix)) !== $suffix) {
                continue;
            }

            if (strpos($name, 'Abstract') === 0) {
                continue;
            }

            $className = $namespacePrefix . $name;

            if ($isProDirectory) {
                $className = self::PRO_KEY_HANDLE . $className;
            }

            $classes[] = $className;
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
}
