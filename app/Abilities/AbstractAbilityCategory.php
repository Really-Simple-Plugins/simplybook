<?php

namespace SimplyBook\Abilities;

abstract class AbstractAbilityCategory
{
    /**
     * The human-readable label for the ability category as documented here:
     * {@see wp_register_ability_category}
     */
    abstract public function getLabel(): string;

    /**
     * A description of the ability category as documented here:
     * {@see wp_register_ability_category}
     */
    abstract public function getDescription(): string;

    /**
     * Optional meta information about the ability category. A subclass may
     * override to provide specific metadata.
     * @see wp_register_ability_category For details about the structure.
     */
    public function getMeta(): array
    {
        return [];
    }

    /**
     * The unique slug for the ability category. Must contain only lowercase
     * alphanumeric characters and dashes. Documented here:
     * {@see wp_register_ability_category}
     */
    final public function getSlug(): string
    {
        return sanitize_title($this->getLabel());
    }

    /**
     * Convert the category to an array suitable for registration with the
     * WP Abilities API. Empty values are omitted from the array. Registration
     * is done in {@see AbilitiesManager::registerAbilitiesCategory}.
     */
    final public function toArray(): array
    {
        return array_filter([
            'slug' => $this->getSlug(),
            'label' => $this->getLabel(),
            'description' => $this->getDescription(),
            'meta' => $this->getMeta(),
        ]);
    }
}
