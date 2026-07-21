<?php

namespace SimplyBook\Abilities\Categories;

abstract class AbstractAbilityCategory
{
    /**
     * The unique slug for the ability category. Must contain only lowercase
     * alphanumeric characters and dashes. Documented here:
     * {@see WP_Ability_Categories_Registry::register}
     */
    abstract public function getSlug(): string;

    /**
     * The human-readable label for the ability category as documented here:
     * {@see WP_Ability_Categories_Registry::register}
     */
    abstract public function getLabel(): string;

    /**
     * A description of the ability category as documented here:
     * {@see WP_Ability_Categories_Registry::register}
     */
    abstract public function getDescription(): string;
}
