<?php

namespace SimplyBook\Services;

use SimplyBook\Helpers\Event;

/**
 * Service for tracking which pages/posts contain SimplyBook widgets.
 *
 * This service handles the business logic for monitoring widget usage across
 * WordPress posts and pages, including shortcodes, Gutenberg blocks, and Elementor widgets.
 */
class WidgetTrackingService
{
	public const PAGES_WITH_WIDGET_OPTION = '_simplybook_pages_with_shortcode';
	public const SHORTCODE_IDENTIFIER = 'simplybook_widget';
	public const GUTENBERG_BLOCK_IDENTIFIER = 'simplybook/widget';

	private int $postId;
	private \WP_Post $post;

	/**
	 * Set the current post for processing.
	 */
	public function setPost(int $postId, ?\WP_Post $post = null): void
	{
		$this->post = $post ?? get_post($postId);
		$this->postId = $postId;
	}

	/**
	 * Check if the current post contains a SimplyBook widget.
	 */
	public function postContainsWidget(): bool
    {
		if ($this->hasPost() === false) {
			throw new \RuntimeException(
				sprintf('%s: No post set, post could not be fetched.', __METHOD__)
			);
		}

		return $this->postHasShortcode()
		       || $this->postHasGutenbergBlock()
		       || $this->postHasElementorWidget();
	}

	/**
	 * Check if a widget was removed from the current post.
	 */
	public function widgetWasRemoved(): bool
	{
		if ($this->hasPost() === false) {
			throw new \RuntimeException(
				sprintf('%s: No post set, post could not be fetched.', __METHOD__)
			);
		}

		return !$this->postContainsWidget() && $this->postIsCurrentlyTracked();
	}

	/**
	 * Add the current post to widget tracking.
	 *
	 * Fires a CALENDAR_PUBLISHED event if this is the first widget being published.
	 */
	public function trackPost(): void
	{
		if ($this->hasPost() === false) {
			throw new \RuntimeException(
				sprintf('%s: No post set, post could not be fetched.', __METHOD__)
			);
		}

		$trackedPosts = $this->getTrackedPosts();

		if ($this->postIsCurrentlyTracked()) {
			return; // Already tracked
		}

		// Fire published event only for the very first widget
		if (empty($trackedPosts)) {
			Event::dispatch(Event::CALENDAR_PUBLISHED);
		}

		$trackedPosts[] = $this->postId;
		$this->updateTrackedPosts($trackedPosts);
	}

	/**
	 * Remove a post from widget tracking.
	 *
	 * Fires a CALENDAR_UNPUBLISHED event if this was the last tracked widget.
	 */
	public function untrackPost(?int $postId = null): void
	{
		$id = $postId ?? $this->postId;

		if (empty($id)) {
			throw new \InvalidArgumentException('Missing mandatory post ID');
		}

		$allTrackedPosts = $this->getTrackedPosts();
		$remainingPosts = array_diff($allTrackedPosts, [$id]);
		$this->updateTrackedPosts($remainingPosts);

		// Fire unpublished event if no more widgets exist
		if (empty($remainingPosts)) {
			Event::dispatch(Event::CALENDAR_UNPUBLISHED);
		}
	}

	/**
	 * Get all posts that are currently being tracked.
	 */
	public function getTrackedPosts(): array
	{
		return get_option(self::PAGES_WITH_WIDGET_OPTION, []);
	}

	/**
	 * Check if any widgets are currently published.
	 * This method can be used to validate if the publish widget task should be
     * completed.
	 */
	public function hasTrackedPosts(): bool
	{
		return !empty($this->getTrackedPosts());
	}

	/**
	 * Check if the current post is currently being tracked.
	 * @throws \InvalidArgumentException If no post has been set
	 */
	private function postIsCurrentlyTracked(): bool
	{
		if ($this->hasPost() === false) {
			throw new \RuntimeException(
				sprintf('%s: No post set, post could not be fetched.', __METHOD__)
			);
		}

		$trackedPosts = $this->getTrackedPosts();
		return in_array($this->postId, $trackedPosts);
	}

	/**
	 * Update the tracked posts list in the database.
     *
	 * @param array $posts Array of post IDs to store
	 */
	private function updateTrackedPosts(array $posts): void
	{
		update_option(self::PAGES_WITH_WIDGET_OPTION, $posts);
	}

    /**
     * Check if the post content contains the SimplyBook shortcode. This also
     * tracks pages made with Elementor by users who use the Shortcode element
     * instead of our custom block.
     */
    private function postHasShortcode(): bool
    {
        return has_shortcode($this->post->post_content, self::SHORTCODE_IDENTIFIER);
    }

	/**
	 * Check if the post content contains a SimplyBook Gutenberg block.
	 */
	private function postHasGutenbergBlock(): bool
	{
		if ($this->hasPost() === false) {
			throw new \RuntimeException(
				sprintf('%s: No post set, post could not be fetched.', __METHOD__)
			);
		}

		return has_block(self::GUTENBERG_BLOCK_IDENTIFIER, $this->post->post_content);
	}

	/**
	 * Check if the post contains a SimplyBook Elementor widget.
	 */
	private function postHasElementorWidget(): bool
	{
		if ($this->hasPost() === false) {
			throw new \RuntimeException(
				sprintf('%s: No post set, post could not be fetched.', __METHOD__)
			);
		}

		// Check if Elementor is active and this post uses Elementor
		if (!class_exists('\Elementor\Plugin')) {
			return false;
		}

		// Get Elementor data for this post
		$elementorData = get_post_meta($this->postId, '_elementor_data', true);

		if (empty($elementorData)) {
			return false;
		}

		// Parse JSON data
		$data = json_decode($elementorData, true);
		if (!is_array($data)) {
			return false;
		}

		// Recursively search for SimplyBook widgets in the Elementor structure
		return $this->elementorDataContainsWidget($data);
	}

	/**
	 * Recursively search Elementor data structure for SimplyBook widgets.
	 */
	private function elementorDataContainsWidget(array $elements): bool
	{
		foreach ($elements as $element) {
			// Check if this element is a SimplyBook widget
			if (isset($element['widgetType']) && $element['widgetType'] === self::SHORTCODE_IDENTIFIER) {
				return true;
			}

			// Recursively check child elements
			if (isset($element['elements']) && is_array($element['elements'])) {
				if ($this->elementorDataContainsWidget($element['elements'])) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Use this method to set the "publish widget" notice and task as completed.
	 * These flags are deleted after its one time use in the Task and Notice.
	 */
	public function setPublishWidgetCompleted(bool $completed = true): void
	{
		update_option('simplybook_calendar_published_notification_completed', $completed);
		update_option('simplybook_calendar_published_task_completed', $completed);
	}

	/**
	 * Check if a post has been set.
	 */
	public function hasPost(): bool
	{
		return !empty($this->postId) && ($this->post instanceof \WP_Post);
	}
}