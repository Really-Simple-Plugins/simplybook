<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class PostOnSocialMediaTask extends AbstractTask
{
    public const IDENTIFIER = 'special_feature_post_on_social_media';

    /**
     * @inheritDoc
     */
    protected bool $required = true;

    /**
     * @inheritDoc
     */
    protected bool $specialFeature = true;

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return __('Post your social media content and create ads', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => __('More info', 'simplybook'),
            'login_link' => 'v2/metric',
        ];
    }
}
