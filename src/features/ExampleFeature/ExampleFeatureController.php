<?php
namespace Simplybook\Features\ExampleFeature;

use Simplybook\Interfaces\FeatureInterface;

class ExampleFeatureController implements FeatureInterface
{
    protected ExampleFeatureService $service;
    protected ExampleFeatureRepository $repository;

    public function __construct(ExampleFeatureService $service, ExampleFeatureRepository $repository)
    {
        $this->service = $service;
        $this->repository = $repository;
    }

    public function register()
    {
        // Add your actions and filters here
    }
}