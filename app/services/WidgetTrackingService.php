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
	public function postContainsWidget(): bool {

		if ($this->hasPost() === false) {
			throw new \RuntimeException(
				sprintf('%s: No post set, post could not be fetched.', __METHOD__)
			);
		}

		return has_shortcode($this->post->post_content, self::SHORTCODE_IDENTIFIER)
		       || $this->postHasGutenbergBlock();
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

		return !$this->widgetWasRemoved() && $this->postIsCurrentlyTracked();
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
	 *
	 * This method can be used to validate if the publish widget task should be completed.
	 */
	public function hasTrackedPosts(): bool
	{
		return !empty($this->getTrackedPosts());
	}

	/**
	 * Check if the current post is currently being tracked.
	 *
	 * @return bool True if the current post is in the tracked posts list
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
		return $this->post instanceof \WP_Post;
	}
}