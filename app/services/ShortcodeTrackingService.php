<?php

namespace SimplyBook\Services;

use SimplyBook\Helpers\Event;

/**
 * Service responsible for tracking which pages/posts contain SimplyBook shortcodes.
 *
 * This service monitors WordPress post- saves and deletions to maintain an accurate
 * list of published pages that contain booking widgets. It fires events when
 * a shortcode publishing status changes to notify other parts of the application.
 */
class ShortcodeTrackingService
{

	const PAGES_WITH_SHORTCODE_OPTION = 'simplybook_pages_with_shortcode';
	const SHORTCODE_IDENTIFIER = 'simplybook_widget';

	/**
	 * Initialize the service by registering WordPress hooks.
	 *
	 * Registers event listeners for post save and delete operations to automatically
	 * track shortcode usage across the WordPress site.
	 */
	public function __construct()
	{
		add_action('save_post', [$this, 'handlePostSave'], 10, 3);
		add_action('delete_post', [$this, 'handlePostDelete']);
	}

	/**
	 * Update shortcode tracking when a post is saved or updated.
	 *
	 * WordPress automatically calls this method when any post is saved.
	 * It checks if the post contains SimplyBook shortcodes and updates the tracking
	 * accordingly. Fires events when calendar shortcode publishing status changes.
	 *
	 * @param int $postId The ID of the post being saved
	 * @param \WP_Post $post The post-object being saved
	 * @param bool $update Whether this is an existing post being updated (true) or a new post (false)
	 *
	 * @fires simplybook_event_calendar_published When a shortcode is detected on a new page
	 * @fires simplybook_event_calendar_unpublished When the last shortcode is removed from all pages
	 */
	public function handlePostSave(int $postId, \WP_Post $post, bool $update): void
	{

		// Filter out revisions, autosaves, and non-published posts.
		if ( wp_is_post_revision($postId) ||
		    wp_is_post_autosave($postId) ||
		    $post->post_status !== 'publish') {
			return;
		}

		// Get tracked pages from the options table.
		$trackedPages = get_option(self::PAGES_WITH_SHORTCODE_OPTION, []);
		$hasShortcode = has_shortcode($post->post_content, self::SHORTCODE_IDENTIFIER);
		$wasTracked = in_array($postId, $trackedPages);

		$shouldAddToTracking = $hasShortcode && !$wasTracked;
		$shouldRemoveFromTracking = !$hasShortcode && $wasTracked;
		$isFirstShortcodePublished = $shouldAddToTracking && empty($trackedPages);

		if ($shouldAddToTracking) {
			// Fire published event only for the very first shortcode
			if ($isFirstShortcodePublished) {
				do_action('simplybook_event_' . Event::CALENDAR_PUBLISHED);
			}

			$trackedPages[] = $postId;
			update_option(self::PAGES_WITH_SHORTCODE_OPTION, $trackedPages);

		} elseif ($shouldRemoveFromTracking) {
			$trackedPages = array_diff($trackedPages, [$postId]);
			update_option(self::PAGES_WITH_SHORTCODE_OPTION, $trackedPages);

			// Fire unpublished event if no more shortcodes exist
			if (empty($trackedPages)) {
				do_action('simplybook_event_' . Event::CALENDAR_UNPUBLISHED);
			}
		}
	}

	/**
	 * Remove a post from shortcode tracking when it's deleted.
	 *
	 * WordPress automatically calls this method when any post is deleted.
	 * It removes the post from tracking and fires a calendar unpublished event if this
	 * was the last page containing a shortcode.
	 *
	 * @param int $postId The ID of the post being deleted
	 *
	 * @fires simplybook_event_calendar_unpublished When the last tracked page is deleted
	 */
	public function handlePostDelete(int $postId): void
	{
		$trackedPages = get_option(self::PAGES_WITH_SHORTCODE_OPTION, []);
		$trackedPages = array_diff($trackedPages, [$postId]);
		update_option(self::PAGES_WITH_SHORTCODE_OPTION, $trackedPages);

		// Fire unpublished event if no more shortcodes exist
		if (empty($trackedPages)) {
			do_action('simplybook_event_' . Event::CALENDAR_UNPUBLISHED);
		}
	}
}