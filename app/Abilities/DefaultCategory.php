<?php

declare(strict_types=1);

namespace SimplyBook\Abilities;

class DefaultCategory extends AbstractAbilityCategory
{
    /**
     * @inheritDoc
     */
    public function getSlug(): string
    {
        return 'simplybook';
    }

    /**
     * @inheritDoc
     */
    public function getLabel(): string
    {
        return __('SimplyBook.me General Abilities', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getDescription(): string
    {
        return __('Abilities related to the SimplyBook.me plugin.', 'simplybook');
    }
}
