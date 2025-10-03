<?php
namespace SimplyBook\Services;

class NoticeDismissalService
{
    private const ALLOWED_NOTICE_TYPES = [
        'trial',
        'review',
    ];

    private const META_KEY = 'simplybook_dismissed_notices';

    /**
     * Dismiss a notice for a specific user
     *
     * @param int $userId The user ID
     * @param string $noticeType The type of notice to dismiss
     * @return bool True on success, false on failure
     */
    public function dismissNotice(int $userId, string $noticeType): bool
    {
        if (!$this->isValidNoticeType($noticeType)) {
            return false;
        }

        $dismissedNotices = $this->getDismissedNotices($userId);

        if (in_array($noticeType, $dismissedNotices, true)) {
            return true;
        }

        $dismissedNotices[] = $noticeType;

        $result = update_user_meta($userId, self::META_KEY, $dismissedNotices);

        return $result !== false;
    }

    /**
     * Check if a notice has been dismissed by a specific user
     *
     * @param int $userId The user ID
     * @param string $noticeType The type of notice to check
     * @return bool True if dismissed, false otherwise
     */
    public function isNoticeDismissed(int $userId, string $noticeType): bool
    {
        $dismissedNotices = $this->getDismissedNotices($userId);

        return in_array($noticeType, $dismissedNotices, true);
    }

    public function getAllowedNoticeTypes(): array
    {
        return self::ALLOWED_NOTICE_TYPES;
    }

    private function getDismissedNotices(int $userId): array
    {
        $dismissed = get_user_meta($userId, self::META_KEY, true);

        return is_array($dismissed) ? $dismissed : [];
    }

    private function isValidNoticeType(string $noticeType): bool
    {
        return in_array($noticeType, self::ALLOWED_NOTICE_TYPES, true);
    }
}