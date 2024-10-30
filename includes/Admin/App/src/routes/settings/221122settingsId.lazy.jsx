const useSettingsLoader = (settingsId) => {
  const menuData = window.simplybook?.settings_menu || []
  const settingsData = menuData.find((item) => item.id === settingsId)

  if (!settingsData) {
    throw new Error('Settings not found')
  }
  return { settingsData }
}

// Route Definition
export const Route = createLazyFileRoute('/settings/221122settingsId')({
  loader: ({ params }) => useSettingsLoader(params.settingsId),
  component: Settings,
})

// Settings Component
function Settings() {
  const {
    currentSettings,
    settingsIsLoading,
    updateSettings,
    settingsIsUpdating,
    defaultValues,
  } = useSettingsData()
  // @todo make sure defaultValues is not empty before using it. I should make it a new component and wrap it in a conditional
  const { menuIsError, menuIsLoading, currentSection } = useSettingsMenu()
  console.log('defaultValues', defaultValues)

  if (menuIsLoading) return <div>Loading...</div>
  if (menuIsError) return <div>Error loading settings menu</div>

  const handleFormSubmit = (values) => {
    updateSettings(values, { onSuccess: () => reset() })
  }

  const lastGroup = currentSection.groups[currentSection.groups.length - 1]
  return (
    <>
      {currentSection.groups?.map((group) => {
        const isLastGroup = lastGroup.id === group.id
        // const groupSettings = currentSettings.filter(
        //     (setting) => setting.group_id === group.id
        // );
        const className = isLastGroup ? 'rounded-b-none' : 'mb-5'

        return (
          <Block key={group.id} className={className}>
            <BlockHeading title={group.title} />
            <BlockContent>
              <div className="flex flex-wrap">
                {groupSettings.map((setting) => (
                  <Controller
                    key={setting.id}
                    name={setting.id}
                    control={control}
                    render={({ field }) => (
                      <FormField
                        setting={setting}
                        {...field}
                        settingsIsUpdating={settingsIsUpdating}
                      />
                    )}
                  />
                ))}
              </div>
            </BlockContent>
          </Block>
        )
      })}
    </>
  )
}
