import { createLazyFileRoute, Link, Outlet } from '@tanstack/react-router'
import Header from '../components/Header'
import Block from '../components/Blocks/Block'
import BlockHeading from '../components/Blocks/BlockHeading'
import ErrorBoundary from '../components/Common/ErrorBoundary'
import { __ } from '@wordpress/i18n'
import useSettingsMenu from '../hooks/useSettingsMenu'
import useSettingsData from '../hooks/useSettingsData';

export const Route = createLazyFileRoute('/settings')({
  component: () => <Settings />,
})

const Settings = () => {
  const { menu, menuIsLoading, menuIsError } = useSettingsMenu();
  return (
    <>
      <Header />
      <div className="flex mx-auto max-w-screen-2xl">
        <div className="flex gap-5  m-5 w-full">
          <Block colSpan={3} rowSpan={4} className={'flex-1 max-w-xs pb-2'}>
            <BlockHeading
              title={__('Settings', 'simplybook')}
              controls={null}
            />
            <div className="flex flex-col justify-start">
              {menuIsLoading && <div>Loading...</div>}
              {menuIsError && <div>Error loading settings</div>}
              {!menuIsLoading &&
                !menuIsError &&
                menu &&
                menu.map((item) => {
                  const className = "py-2 px-5 border-l-4 text-black  border-transparent [&.active]:border-blue-500 focus:outline-none hover:border-gray-500 hover:bg-gray-100 focus:outline-none";
                  if (item.url) {
                    return (
                      <Link
                        key={item.id}
                        to={item.url}
                        className={className}
                        target="_blank"
                      >
                        {item.title} (O)
                      </Link>
                    )
                  }
                  return (
                  <Link
                    key={item.id}
                    to={`/settings/${item.id}`}
                    className={className}
                  >
                    {item.title}
                  </Link>
                )}
                )}
            </div>
          </Block>
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
