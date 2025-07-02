<?php namespace SimplyBook\Managers;

use SimplyBook\App;
use SimplyBook\Plugin;
use SimplyBook\Interfaces\FeatureInterface;

final class FeatureManager
{
    /**
     * Register and load all features from the src/features directory. This
     * method automatically loads all classes from the features directory and
     * injects the dependency classes into the Controller class if they exist.
     * @uses do_action simplybook_features_loaded
     */
    public function registerFeatures(array $features)
    {
        foreach ($features as $featureName => $settings) {
            $enabled = ($settings['enabled'] ?? false);
            $inScope = ($settings['inScope'] ?? true);
            $needsPro = ($settings['pro'] ?? false);

            // Check if the feature should be loaded
            if (!$enabled || !$inScope || ($needsPro && !App::env('plugin.pro'))) {
                continue;
            }

            // Check if the feature directory exists
            $featuresPath = $this->getFeaturePath($featureName, $needsPro);
            if (!is_dir($featuresPath)) {
                continue;
            }

            // Load all classes from the feature directory
            $priorityFiles = ($settings['priorityFiles'] ?? []);
            $loaded = $this->loadAllFeatureFiles($featuresPath, $priorityFiles);
            if ($loaded === false) {
                continue;
            }

            // Get the feature namespace
            $prefix = $this->getFeatureNamespace($featureName, $needsPro) . $featureName;

            // The controller is the backbone of a feature
            $controllerClass = $prefix . 'Controller';
            if (!class_exists($controllerClass)) {
                continue;
            }

            $dependencies = [];
            if (!empty($settings['dependencies'])) {
                $dependencies = $this->resolveDependencies($settings['dependencies'], $prefix);
            }

            // Start the feature by instantiating the controller
            $instance = new $controllerClass(... $dependencies);

            // Reject all given feature Controllers when they do not implement
            // the FeatureInterface
            if (!$instance instanceof FeatureInterface) {
                continue;
            }

            $instance->register();
        };

        do_action('simplybook_features_loaded');
    }

    /**
     * Get the feature path based on the feature name and if it needs the Pro
     * version.
     */
    private function getFeaturePath(string $featureName, bool $needsPro): string
    {
        return App::env('plugin.feature_path') . ($needsPro ? 'Pro/' : '') . $featureName . '/';
    }

    /**
     * Get the feature namespace.
     *
     * @uses ReflectionClass to get the namespace of the Plugin class assuming
     * that the main Plugin class exists and is in the root of the Plugin
     * directory.
     */
    private function getFeatureNamespace(string $featureName, bool $needsPro = false): string
    {
        $reflection = new \ReflectionClass(Plugin::class);
        return $reflection->getNamespaceName() . '\Features\\' . ($needsPro ? 'Pro\\' : '') . $featureName . '\\';
    }

    /**
     * Resolve the dependencies for the given feature.
     * @throws \LogicException when a dependency does not exist.
     */
    private function resolveDependencies(array $dependencies, string $featureNamespace): array
    {
        return array_map(function ($dependency) use ($featureNamespace) {
            $fullClassName = $featureNamespace . $dependency;

            // if $dependency starts with a backslash, it's a fully qualified
            // class name, and we can instantiate it directly
            if ($dependency[0] === '\\') {
                $fullClassName = $dependency;
            }

            if (!class_exists($fullClassName)) {
                throw new \LogicException("Dependency " . esc_html($fullClassName) . " does not exist.");
            }

            return new $fullClassName();
        }, $dependencies);
    }

    /**
     * Load all files for the current feature from the given directory. This
     * method will even load files from subdirectories.
     */
    private function loadAllFeatureFiles(string $directory, array $priorityFiles = []): bool
    {
        if (!is_dir($directory)) {
            return false;
        }

        if (!empty($priorityFiles)) {
            foreach ($priorityFiles as $priorityFile) {
                require_once trailingslashit($directory) . $priorityFile . '.php';
            }
        }

        $recursivelyFoundFilesInDirectory = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($directory, \FilesystemIterator::SKIP_DOTS),
        );

        foreach ($recursivelyFoundFilesInDirectory as $file) {
            require_once $file->getPathname();
        }

        return true;
    }
}