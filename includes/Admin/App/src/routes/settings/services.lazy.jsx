import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/services')({
  component: () => <div>Hello /settings/services!</div>,
})
