<?php
namespace Simplybook\Providers;

class AppServiceProvider extends Provider
{
    protected array $provides = [
        'example',
    ];

    /**
     * This method is called by the Provider based on the keys in the $provides
     * array. The provided class can be used in the complete application by
     * calling App::provide('example'). Each instance will be he same. Providing
     * functionality is a way to share functionality across the application. For
     * example if you need to build a Client class that does HTTP requests to a
     * specific API, you can provide that class, completely built, to the
     * application.
     */
    public function provideExample(): object
    {
        // Do something with the provided service
        return new class('foo', 'bar', 'baz') {

            protected string $foo;
            protected string $bar;
            protected string $baz;

            public function __construct($foo, $bar, $baz)
            {
                $this->foo = $foo;
                $this->bar = $bar;
                $this->baz = $baz;
            }
        };
    }
}