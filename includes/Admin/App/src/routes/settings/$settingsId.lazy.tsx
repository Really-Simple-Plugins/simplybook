import {
  createLazyFileRoute,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router'
import { __ } from '@wordpress/i18n'
import BlockHeading from '../../components/Blocks/BlockHeading.jsx'
import Header from '../../components/Header'
import Block from '../../components/Blocks/Block'
import ErrorBoundary from '../../components/Common/ErrorBoundary'
import useSettingsMenu from '../../hooks/useSettingsMenu'
import BlockContent from '../../components/Blocks/BlockContent'
import { useEffect, useState } from 'react'
import useSettingsData from '../../hooks/useSettingsData'
import ButtonInput from '../../components/Inputs/ButtonInput'

export const Route = createLazyFileRoute('/settings/$settingsId')({
  // @todo move to a seperate function? or a hook?
  loader: ({ params }) => {
    // Instead of fetching from an API, we access the localized menu data
    const menuData = window.simplybook?.settings_menu || []
    const settingsData = menuData.find((item) => item.id === params.settingsId)
    if (!settingsData) {
      throw new Error('Settings not found')
    }
    return { settingsData }
  },
  component: Settings,
})

function Settings() {
  const { settings, saveSettings, isSaving, isLoading } = useSettingsData()
  const { menu, menuIsError, menuIsLoading, currentSection } = useSettingsMenu()
  const { settingsId } = Route.useParams()
  if (menuIsLoading) {
    return <div>Loading...</div>
  }

  if (menuIsError) {
    return <div>Error loading settings menu</div>
  }

  const lastGroupId = currentSection.groups[currentSection.groups.length - 1].id
  return (
    <>
      {currentSection.groups &&
        currentSection.groups.map((group) => {
          // if last block add class
          const className = lastGroupId === group.id ? 'rounded-b-none' : 'mb-5'
          return (
            <Block key={group.id} className={className}>
              <BlockHeading title={group.title} />
              <BlockContent>
                {isLoading ? 'Loading settings fields...' : group.title}
              </BlockContent>
            </Block>
          )
        })}

      <div className={'sticky bg-gray-50 shadow-md rounded-b-md z-10'}>
        <ScrollProgressLine />
        <div className={'flex flex-row p-5 justify-end'}>
          <ButtonInput onClick={saveSettings} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </ButtonInput>
          {isSaving && <div>Saving...</div>}
        </div>
      </div>
    </>
  )
}

const ScrollProgressLine = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(Math.round((window.scrollY / scrollable) * 100))
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const canScroll = document.documentElement.scrollHeight > window.innerHeight

  if (!canScroll) {
    return null
  }
  return (
    <div className="w-full bg-gray-200 h-1">
      <div
        className="bg-blue-500 h-full"
        style={{ width: `${Math.max(scrollProgress, 10)}%` }}
      ></div>
    </div>
  )
}
