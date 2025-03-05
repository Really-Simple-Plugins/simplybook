<?php
namespace SimplyBook\App\Http\Endpoints;

use SimplyBook\App;
use SimplyBook\Traits\HasRestAccess;
use SimplyBook\Traits\HasAllowlistControl;
use SimplyBook\Interfaces\SingleEndpointInterface;

class DashboardDataEndpoint implements SingleEndpointInterface
{
    use HasRestAccess;
    use HasAllowlistControl;

    const ROUTE = 'get_dashboard_data';

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
            'callback' => [$this, 'callback'],
        ];
    }

    /**
     * Return the company login domain in the WP_REST_Response.
     */
    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $now = time();
        $oneMonthAgo = strtotime('-1 month', $now);
        $midnightLastNight = strtotime('midnight', strtotime('-1 day'));

        $bookingsCountLastMonth = App::provide('client')->get_bookings_count($oneMonthAgo, $now);
        $bookingsCountToday = App::provide('client')->get_bookings_count($midnightLastNight, $now);

        return $this->sendHttpResponse([
            'bookings_count_month' => $bookingsCountLastMonth,
            'bookings_count_day' => $bookingsCountToday,
            'most_popular_provider' => $this->getMostPopularEntity('provider'),
            'most_popular_service' => $this->getMostPopularEntity('service'),
        ]);
    }

    /**
     * Get the most popular entity (provider or service). Returns an array with
     * the name and the percentage of the most popular entity. For both entities
     * we need to fetch the bookings, which we save in the cache for 60 seconds.
     */
    protected function getMostPopularEntity(string $entity): array
    {
        $allowedEntities = ['provider', 'service'];
        if (!$this->adminAccessAllowed() || !in_array($entity, $allowedEntities)) {
            return [];
        }

        $now = time();
        $oneMonthAgo = strtotime('-1 month', $now);

        $bookings = wp_cache_get('bookings', 'simplybook_get_dashboard_data');
        if (empty($bookings)) {
            $bookings = App::provide('client')->get_bookings($oneMonthAgo, $now);
            wp_cache_set('bookings', $bookings, 'simplybook_get_dashboard_data', 60);
        }

        $entities = [];
        $entityNames = [];
        foreach ($bookings as $booking) {
            if (
                !isset($booking[$entity])
                || !isset($booking[$entity]['id'])
                || !isset($booking[$entity]['name'])
            ) {
                continue;
            }

            $entityId = $booking[$entity]['id'];
            $entityNames[$entityId] = $booking[$entity]['name'];
            if (isset($entities[$entityId])) {
                $entities[$entityId]++;
            } else {
                $entities[$entityId] = 1;
            }
        }

        // Sort entities by bookings count
        arsort($entities);
        $mostPopularEntityId = key($entities);
        $bookingsCount = count($bookings);
        if (($bookingsCount === 0) || ($entities[$mostPopularEntityId] === 0)) {
            return [
                'name' => __("Most popular $entity", 'simplybook'),
                'percentage' => 0,
            ];
        }

        return [
            'name' => $entityNames[$mostPopularEntityId],
            'percentage' => round($entities[$mostPopularEntityId] / $bookingsCount * 100),
        ];
    }
}