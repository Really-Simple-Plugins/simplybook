import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/providers')({
  component: () => <div>Hello /settings/providers!</div>,
})
