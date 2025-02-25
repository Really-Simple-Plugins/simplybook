<?php
namespace SimplyBook;

use Adbar\Dot;

final class App
{
    private static Dot $env;
    private static Dot $menus;
    private static Dot $features;
    private static Dot $providers;

    /**
     * Static method to get data from the environment. Method ensures loading
     *  is only done once and just in time.
     * @return mixed
     */
    public static function env(string $key)
    {
        if (empty(self::$env)) {
            self::$env = self::dotFromPath(dirname(__FILE__, 2).'/config/environment.php');
        }
        return self::$env->get($key);
    }

    /**
     * Static method to get and load the features' config. Method ensures loading
     * is only done once and just in time.
     * @return mixed
     */
    public static function features(?string $key = null)
    {
        if (empty(self::$features)) {
            self::$features = self::dotFromPath(dirname(__FILE__, 2).'/config/features.php');
        }
        return self::$features->get($key);
    }

    /**
     * Static method to get data from the menus. Method ensures loading
     * is only done once and just in time.
     *
     * @see https://make.wordpress.org/core/2024/10/21/i18n-improvements-6-7/#Enhanced-support-for-only-using-PHP-translation-files
     * @return mixed
     * @throws \LogicException If the method is called before the init hook
     */
    public static function menus(?string $key = null)
    {
        if (doing_action('init') === false && did_action('init') === false) {
            throw new \LogicException('Menus can only be accessed after the init hook due to the use of translations.');
        }

        if (empty(self::$menus)) {
            self::$menus = self::dotFromPath(dirname(__FILE__, 2).'/config/menus.php');
        }

        return (empty($key) ? self::$menus : self::$menus->get($key));
    }

    /**
     * Static method to get data from the providers.
     * @return mixed
     * @throws \InvalidArgumentException If the key is not available in the providers
     */
    public static function provide($key)
    {
        if (!self::$providers->has($key)) {
            throw new \InvalidArgumentException("No {$key} available as a provided functionality.");
        }

        return self::$providers->get($key);
    }

    /**
     * Register a provided service to the application
     * @throws \LogicException If the method is called on or after the init hook
     */
    public static function register(string $key, $value)
    {
        if (doing_action('init') || did_action('init')) {
            throw new \LogicException('Register a provided before the init hook to make it available in the application.');
        }

        if (empty(self::$providers)) {
            self::$providers = new Dot();
        }

        self::$providers->set($key, $value);
    }

    /**
     * Return a config file as a Dot instance
     * @throws \InvalidArgumentException
     */
    private static function dotFromPath(string $path): Dot
    {
        if (!file_exists($path)) {
            throw new \InvalidArgumentException("Unloadable configuration file {$path} provided.");
        }

        return new Dot(require $path);
    }
}