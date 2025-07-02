<?php namespace SimplyBook\Builders;

class PageBuilder
{
    private string $title = '';
    private string $content = '';
    private string $status = 'publish';
    private string $type = 'page';
    private array $acceptedStati = [
        'publish',
        'draft',
        'pending',
        'private',
        'trash',
    ];

    public function setTitle(string $title): PageBuilder
    {
        $this->title = sanitize_text_field($title);
        return $this;
    }

    public function setContent(string $content): PageBuilder
    {
        $this->content = wp_kses_post($content);
        return $this;
    }

    /**
     * Set the status of the page. If no status is provided, the default status
     * is 'draft'. See: {@see wp_insert_post()}
     */
    public function setStatus(string $status): PageBuilder
    {
        $status = sanitize_text_field($status);
        if (!in_array($status, $this->acceptedStati)) {
            return $this;
        }

        $this->status = $status;
        return $this;
    }

    public function setType(string $type): PageBuilder
    {
        $this->type = sanitize_text_field($type);
        return $this;
    }

    /**
     * Insert a new page into the database
     * @return int The ID of the newly created page or -1 on failure
     * @uses wp_insert_post
     */
    public function insert(): int
    {
        $page = [
            'post_title' => $this->title,
            'post_content' => $this->content,
            'post_status' => $this->status,
            'post_type' => $this->type,
        ];

        $insertedPageId = wp_insert_post($page);
        if (is_wp_error($insertedPageId)) {
            return -1;
        }

        do_action('simplybook_insert_page', $insertedPageId, $this->title, $this->content);
        return $insertedPageId;
    }

    /**
     * Update an existing page in the database
     * @return int The ID of the updated page or -1 on failure
     * @uses wp_update_post
     */
    public function update(int $pageId): int
    {
        $page = [
            'ID' => $pageId,
            'post_title' => $this->title,
            'post_content' => $this->content,
            'post_status' => $this->status,
            'post_type' => $this->type,
        ];

        $updatedPostId = wp_update_post($page);
        if (is_wp_error($updatedPostId)) {
            return -1;
        }

        do_action('simplybook_update_page', $pageId, $this->title, $this->content);
        return $updatedPostId;
    }
}