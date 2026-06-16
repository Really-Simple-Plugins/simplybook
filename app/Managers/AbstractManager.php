<?php

declare(strict_types=1);

namespace SimplyBook\Managers;

use SplFileInfo;
use LogicException;
use FilesystemIterator;
use ReflectionException;
use SimplyBook\Bootstrap\App;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;
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
     * Directory name that marks a (sub)tree as Pro-only. When the Pro plugin
     * is not enabled, any class living under a directory with this name is
     * skipped during discovery.
     */
    private const PRO_DIRECTORY = 'Pro';

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
    protected bool $registerDependencies = true;

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

            $class = App::getInstance()->make($fullyClassifiedName, $this->useRegistry, $this->registerDependencies);

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
     *          'SimplyBook\Path\FooBar\ClassnameSuffix',
     *          'SimplyBook\Path\Pro\AdvancedFooBar\AdvancedExampleSuffix',
     *      ]
     */
    private function getRootClasses(): array
    {
        $classes = $this->discoverClasses();
        return apply_filters("simplybook_{$this->type()}_classes", $classes);
    }

    /**
     * Walk the lookup path recursively and return the fully qualified names of
     * every concrete class whose file matches the suffix configured by the
     * child manager. Classes living under a {@see PRO_DIRECTORY} segment are
     * skipped when the Pro plugin is not enabled.
     */
    private function discoverClasses(): array
    {
        $basePath = $this->path();
        if (empty($basePath) || !is_dir($basePath)) {
            return [];
        }

        $baseNamespace = rtrim($this->namespace(), '\\');
        $proEnabled = $this->env->getBoolean('plugin.pro');
        $classes = [];

        foreach ($this->phpFilesIn($basePath) as $file) {
            $name = $file->getBasename('.php');

            if ($this->hasExpectedSuffix($name) === false || $this->isAbstractClass($name)) {
                continue;
            }

            $fullyQualifiedClass = $this->getFullyQualifiedClass($file, $baseNamespace, $basePath);

            if ($proEnabled === false && $this->isProNamespace($fullyQualifiedClass)) {
                continue;
            }

            if (class_exists($fullyQualifiedClass)) {
                $classes[] = $fullyQualifiedClass;
            }
        }

        return $classes;
    }

    /**
     * Yield every `.php` file found below the given path, recursively.
     * @return iterable<SplFileInfo>
     */
    private function phpFilesIn(string $path): iterable
    {
        $directory = new RecursiveDirectoryIterator($path, FilesystemIterator::SKIP_DOTS);
        $iterator = new RecursiveIteratorIterator($directory);

        foreach ($iterator as $file) {
            if ($file->isFile() && $file->getExtension() === 'php') {
                yield $file;
            }
        }
    }

    /**
     * Build the fully qualified class name for the given PHP file by mirroring
     * its directory structure (below the lookup root) onto the base namespace.
     *
     * Normalization happens to be compatible with Windows ánd Linux paths.
     */
    private function getFullyQualifiedClass(SplFileInfo $file, string $baseNamespace, string $basePath): string
    {
        $normalizedBasePath = rtrim(wp_normalize_path($basePath), '/');
        $normalizedFileDirectory = wp_normalize_path($file->getPath());

        $directoryBelowBasePath = substr($normalizedFileDirectory, strlen($normalizedBasePath));
        $directoryNamespace = str_replace('/', '\\', $directoryBelowBasePath);

        return $baseNamespace . $directoryNamespace . '\\' . $file->getBasename('.php');
    }

    /**
     * Check whether any segment of the given namespace marks the class as
     * Pro-only.
     */
    private function isProNamespace(string $namespace): bool
    {
        $segments = explode('\\', trim($namespace, '\\'));
        return in_array(self::PRO_DIRECTORY, $segments, true);
    }

    /**
     * Check whether the given class basename ends with the suffix configured
     * by the child manager via {@see suffix()}.
     */
    private function hasExpectedSuffix(string $name): bool
    {
        $suffix = $this->suffix();
        return substr($name, -strlen($suffix)) === $suffix;
    }

    /**
     * Check whether the given class basename starts with "Abstract".
     */
    private function isAbstractClass(string $name): bool
    {
        return strpos($name, 'Abstract') === 0;
    }
}
