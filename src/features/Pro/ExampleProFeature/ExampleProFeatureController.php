<?php
namespace Simplybook\Features\Pro\ExampleProFeature;

use Simplybook\Interfaces\FeatureInterface;

class ExampleProFeatureController implements FeatureInterface
{
    protected ExampleProFeatureService $service;
    protected ExampleProFeatureRepository $repository;

    public function __construct(ExampleProFeatureService $service, ExampleProFeatureRepository $repository)
    {
        $this->service = $service;
        $this->repository = $repository;
    }

    public function register()
    {
        // Add your actions and filters here
    }
}