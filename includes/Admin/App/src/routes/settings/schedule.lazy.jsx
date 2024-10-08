import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/schedule')({
  component: () => <div>Hello /settings/schedule!</div>,
})
