import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/settings/')({
  component: About,
})

function About() {
  return <div className="p-2">Hello from settings!</div>
}
