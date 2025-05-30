<?php

namespace SimplyBook\Services;

use SimplyBook\Helpers\Event;

/**
 * Service for tracking which pages/posts contain SimplyBook widgets.
 *
 * This service handles the business logic for monitoring widget usage across
 * WordPress posts and pages, including both shortcodes and Gutenberg blocks.
 */
class WidgetTrackingService
{
	const PAGES_WITH_WIDGET_OPTION = 'simplybook_pages_with_shortcode';
	const SHORTCODE_IDENTIFIER = 'simplybook_widget';
	const GUTENBERG_BLOCK_IDENTIFIER = 'simplybook/widget';

	/**
	 * Set the current post for processing.
	 *
	 * @param int $postId The ID of the post to process
	 * @param \WP_Post $post The post object to process
	 */
	public function setPost(int $postId, \WP_Post $post): void
	{
		$this->postId = $postId;
		$this->post = $post;
	}

	/**
	 * Check if the current post contains a SimplyBook widget.
	 *
	 * @return bool True if the post contains a widget (shortcode or Gutenberg block)
	 */
	public function containsWidget(): bool
	{
		$this->validatePostIsSet();

		return has_shortcode($this->post->post_content, self::SHORTCODE_IDENTIFIER)
		       || $this->hasGutenbergBlock($this->post->post_content);
	}

	/**
	 * Check if a widget was removed from the current post.
	 *
	 * @return bool True if the post was previously tracked but no longer contains a widget
	 */
	public function widgetWasRemoved(): bool
	{
		$this->validatePostIsSet();

		return !$this->containsWidget() && $this->isCurrentlyTracked();
	}

	/**
	 * Add the current post to widget tracking.
	 *
	 * Fires a CALENDAR_PUBLISHED event if this is the first widget being published.
	 *
	 */
	public function trackPost(): void
	{
		$this->validatePostIsSet();

		$trackedPosts = $this->getTrackedPosts();

		if ($this->isCurrentlyTracked()) {
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
	 *
	 * @param int|null $postId The post ID to untrack, or null to use the current post
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
	 *
	 * @return array Array of post IDs that contain widgets
	 */
	public function getTrackedPosts(): array
	{
		return get_option(self::PAGES_WITH_WIDGET_OPTION, []);
	}

	/**
	 * Check if any widgets are currently published.
	 *
	 * This method can be used to validate if the publish widget task should be completed.
	 *
	 * @return bool True if at least one widget is published
	 */
	public function hasPublishedWidgets(): bool
	{
		return !empty($this->getTrackedPosts());
	}

	/**
	 * Check if the current post is currently being tracked.
	 *
	 * @return bool True if the current post is in the tracked posts list
	 * @throws \InvalidArgumentException If no post has been set
	 */
	private function isCurrentlyTracked(): bool
	{
		$this->validatePostIsSet();

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
	 * Check if the post content contains a SimplyBook Gutenberg block.
	 *
	 * @param string $content The post content to check
	 * @return bool True if the content contains the Gutenberg block
	 */
	private function hasGutenbergBlock(string $content): bool
	{
		return has_block(self::GUTENBERG_BLOCK_IDENTIFIER, $content);
	}

	/**
	 * Validate that a post has been set for processing.
	 *
	 * @throws \InvalidArgumentException If no post has been set
	 */
	private function validatePostIsSet(): void
	{
		if (empty($this->postId) || empty($this->post)) {
			throw new \InvalidArgumentException('Missing mandatory post data. Call setPost() first.');
		}
	}
}