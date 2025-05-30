<?php

namespace SimplyBook\Controllers;

use SimplyBook\Interfaces\ControllerInterface;
use SimplyBook\Services\WidgetTrackingService;

/**
 * Controller responsible for tracking which pages/posts contain SimplyBook widgets.
 *
 * This controller monitors WordPress post saves and deletions to maintain an accurate
 * list of published pages that contain booking widgets. It fires events when
 * widget publishing status changes to notify other parts of the application.
 */
class WidgetTrackingController implements ControllerInterface
{
	private WidgetTrackingService $service;

	public function __construct(WidgetTrackingService $service)
	{
		$this->service = $service;
	}

	/**
	 * Register WordPress hooks for this controller.
	 */
	public function register(): void
	{
		add_action('save_post', [$this, 'handlePostSave'], 10, 3);
		add_action('delete_post', [$this, 'handlePostDelete']);
		add_action('trashed_post', [$this, 'handlePostTrashed']);
	}

	/**
	 * Update widget tracking when a post is saved or updated.
	 *
	 * WordPress automatically calls this method when any post is saved.
	 * It checks if the post contains SimplyBook widgets and updates the tracking
	 * accordingly. Fires events when widget publishing status changes.
	 *
	 * @param int $postId The ID of the post being saved
	 * @param \WP_Post $post The post object being saved
	 */
	public function handlePostSave(int $postId, \WP_Post $post, bool $update): void
	{

		if (!$this->canHandleSavedPost($postId, $post)) {
			return;
		}

		$this->service->setPost($postId, $post);

		if ($this->service->containsWidget()) {
			$this->service->trackPost();
			return;
		}

		if ($this->service->widgetWasRemoved()) {
			$this->service->untrackPost();
		}
	}

	/**
	 * Remove a post from widget tracking when it's deleted.
	 *
	 * @param int $postId The ID of the post being deleted
	 **/
	public function handlePostDelete(int $postId): void
	{

		$post = get_post($postId);
		$this->service->setPost($postId, $post);

		$allTrackedPosts = $this->service->getTrackedPosts();

		if (!in_array($postId, $allTrackedPosts)) {
			return;
		}

		$this->service->untrackPost($postId);
	}

	/**
	 * @param int $postId
	 *
	 * Handles the post being trashed.
	 *
	 * @return void
	 */
	public function handlePostTrashed(int $postId): void
	{
		$allTrackedPosts = $this->service->getTrackedPosts();

		$post = get_post($postId);
		$this->service->setPost($postId, $post);

		if (!in_array($postId, $allTrackedPosts)) {
			return; // Nothing to do
		}

		$this->service->untrackPost($postId);
	}

	/**
	 * Determine if a saved post should be processed for widget tracking.
	 *
	 * This method filters out revisions, autosaves, and non-published posts
	 * to ensure we only track actual published content that visitors can see.
	 *
	 * @param int $postId The ID of the post being saved
	 * @param \WP_Post $post The post object being saved
	 * @return bool True if the post should be processed, false otherwise
	 */
	private function canHandleSavedPost(int $postId, \WP_Post $post): bool
	{
		return !wp_is_post_revision($postId)
		       && !wp_is_post_autosave($postId)
		       && $post->post_status === 'publish';
	}
}