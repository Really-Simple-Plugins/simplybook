import { createLazyFileRoute, Link, Outlet } from '@tanstack/react-router'
import Header from '../components/Header'
import ErrorBoundary from '../components/Common/ErrorBoundary'
import SettingsMenu from '../components/Settings/SettingsMenu';

export const Route = createLazyFileRoute('/settings')({
  component: () => <Settings />,
})

const Settings = () => {
  return (
    <>
      <Header />
      <div className="flex mx-auto max-w-screen-2xl">
        <div className="flex gap-5  m-5 w-full">
          <div className={"flex-1 max-w-xs"}>
           <SettingsMenu />
          </div>
          <div className="flex-1 flex flex-col">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </div>
          <div className="flex-1 max-w-sm">Hello from settings!</div>
        </div>
      </div>
    </>
  )
}
