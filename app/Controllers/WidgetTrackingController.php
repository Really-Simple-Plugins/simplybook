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
	 */
	public function handlePostSave(int $postId, \WP_Post $post): void
	{

		if ($this->shouldProcessSavedPost($postId, $post) !== true) {
			return;
		}

		$this->service->setPost($postId);

		if ($this->service->postContainsWidget()) {
			$this->service->trackPost();
			return;
		}

		if ($this->service->widgetWasRemoved()) {
			$this->service->untrackPost();
		}
	}

	/**
	 * Remove a post from widget tracking when it's deleted.
	 */
	public function handlePostDelete(int $postId): void
	{

		$this->service->setPost($postId);

		$allTrackedPosts = $this->service->getTrackedPosts();

		if (!in_array($postId, $allTrackedPosts)) {
			return;
		}

		$this->service->untrackPost($postId);
	}

	/**
	 * Handles the post being trashed.
	 */
	public function handlePostTrashed(int $postId): void
	{
		$allTrackedPosts = $this->service->getTrackedPosts();

		$this->service->setPost($postId);

		if (!in_array($postId, $allTrackedPosts)) {
			return; // Nothing to do
		}

		$this->service->untrackPost($postId);
	}

	/**
	 * Determine if a saved post should be processed for widget tracking.
	 */
	private function shouldProcessSavedPost(int $postId, \WP_Post $post): bool
	{
		return !wp_is_post_revision($postId)
		       && !wp_is_post_autosave($postId)
		       && $post->post_status === 'publish';
	}
}