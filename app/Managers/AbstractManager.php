<?php

declare(strict_types=1);

namespace SimplyBook\Managers;

use LogicException;
use ReflectionException;
use SimplyBook\Bootstrap\App;

abstract class AbstractManager
{
    /**
     * Overwrite this property to true when the entries that the child Manager
     * registers should be added to the container registry. For details see:
     * {@see App::make}
     */
    protected bool $useRegistry = false;

    /**
     * Overwrite this property to true when the dependencies of the entries that
     * the child Manager registers should be added to the container registry.
     * For details see: {@see App::make}
     */
    protected bool $registerDependencies = true;

    /**
     * Child class should return the type of classes it registers. In plural
     * form. The value is used to identify the type of classes parsed through
     * the hooks the Manager fires via the methods {@see beforeRegister}
     * and {@see afterRegister}.
     */
    abstract protected function type(): string;

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
     * Method called before all classes given to the manager are registered. Can
     * be used by child-classes to initiate functionality that should be called
     * before the registration of the classes.
     */
    protected function beforeRegister(): void
    {
    }

    /**
     * Method called after all classes given to the manager are registered. Can
     * be used by child-classes to initiate functionality that should be called
     * after the registration of the classes.
     */
    protected function afterRegister(): void
    {
    }

    /**
     * Register the given class as long as the entries are registrable according
     * to the child managers. Class are autowired, but not registered via
     * {@see App::make}
     *
     * @uses apply_filters simplybook_plugin_{@see type} to filter classes
     *
     * @throws LogicException When a developer is doing it wrong.
     * @throws ReflectionException When the controller cannot be loaded.
     */
    public function register(array $classes): void
    {
        $this->beforeRegister();

        $classes = apply_filters('simplybook_plugin_' . $this->type(), $classes);

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

        do_action('simplybook_plugin_' . $this->type() . '_loaded');
    }
}
