import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/custom')({
  component: () => <div>Hello /settings/custom!</div>,
})
