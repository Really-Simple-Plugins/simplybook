<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class PostOnSocialMediaTask extends AbstractTask
{
    const IDENTIFIER = 'special_feature_post_on_social_media';

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
        return esc_html__('Post your social media content and create ads', 'simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('More info','simplybook'),
            'login_link' => 'v2/metric',
        ];
    }
}