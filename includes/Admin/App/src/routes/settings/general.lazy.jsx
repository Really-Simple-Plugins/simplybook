import { createLazyFileRoute } from '@tanstack/react-router'
import useSettingsData from '../../hooks/useSettingsData'
import  Block  from '../../components/Blocks/Block'
import BlockHeading from '../../components/Blocks/BlockHeading';


export const Route = createLazyFileRoute('/settings/general')({
  component: () => <Settings menu_id="general" />,
})

const Settings = ({ menu_id }) => {
    const {
      settings,
      updateSetting,
      saveSettings,
      isLoading,
      isSaving,
      isError,
    } = useSettingsData();

    if (isLoading) return <div>Loading settings...</div>;
    if (isError) return <div>Error loading settings</div>;

  // only get settings for the current menu_id
  const currentSettings = settings[menu_id];

  // loop through object currentSettings and create groups of settings, loop again for fields
  return (
    <div>
      {currentSettings && Object.keys(currentSettings).map((group) => (
        <Block key={group} title={group}>
          <BlockHeading title={group} />
          {/*{currentSettings[group].map((field) => (*/}
          {/*  // <Field type={field.type} key={field.key} {...field} onChange={(value) => updateSetting(field.key, value)} />*/}
          {/*    console.log(field)*/}
          {/*))}*/}
          <h2>Group: {group}</h2>
        </Block>
      ))}

      <button onClick={saveSettings} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}