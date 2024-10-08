import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/design')({
  component: () => <div>Hello /settings/design!</div>,
})
