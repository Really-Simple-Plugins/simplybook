import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/notifications')({
  component: () => <div>Hello /settings/notifications!</div>,
})
