<?php
namespace SimplyBook\Http\Endpoints;

use SimplyBook\Traits\LegacySave;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Utility\StringUtility;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\SingleEndpointInterface;

class PageTitleAvailableEndpoint implements SingleEndpointInterface
{
    use LegacySave;
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'is_page_title_available';

    /**
     * Only enable this endpoint if the user has access to the admin area
     */
    public function enabled(): bool
    {
        return $this->adminAccessAllowed();
    }

    /**
     * @inheritDoc
     */
    public function registerRoute(): string
    {
        return self::ROUTE;
    }

    /**
     * @inheritDoc
     */
    public function registerArguments(): array
    {
        return [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [$this, 'checkIfPageTitleIsAvailable'],
        ];
    }

    /**
     * Check if the given page title is available based on the given url and
     * existing pages.
     */
    public function checkIfPageTitleIsAvailable(\WP_REST_Request $request, array $ajaxData = []): \WP_REST_Response
    {
        $storage = $this->retrieveHttpStorage($request, $ajaxData, 'data');
        $pageTitleIsAvailable = $this->isPageTitleAvailableForURL($storage->getString('url'));

        return $this->sendHttpResponse([], $pageTitleIsAvailable);
    }

    /**
     * Checks if the given page title is available based on the given url and
     * existing pages.
     */
    public function isPageTitleAvailableForURL(string $url): bool
    {
        $title = StringUtility::convertUrlToTitle($url);

        $posts = get_posts([
            'post_type' => 'page',
            'title' => sanitize_text_field($title),
            'post_status' => 'publish',
            'fields' => 'ids',
        ]);

        return empty($posts);
    }
}