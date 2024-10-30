import React from 'react';
import { Link } from '@tanstack/react-router';
import useSettingsMenu from '../../hooks/useSettingsMenu';
import Block from '../Blocks/Block';
import BlockHeading from '../Blocks/BlockHeading';
import { __ } from '@wordpress/i18n';
import SettingsMenuItem from './SettingsMenuItem';

const SettingsMenu = () => {
  const { menu, menuIsLoading, menuIsError } = useSettingsMenu();

  const displayMessage = menuIsLoading || menuIsError || !menu || menu.length === 0;
  if (displayMessage) {
    return (
        <Block colSpan={3} rowSpan={4} className="flex-1 max-w-xs pb-2">
          <BlockHeading title={__('Settings', 'simplybook')} controls={null} />
          <div className="flex flex-col justify-start">
            {menuIsLoading && __('Loading menu...', 'simplybook')}
            {menuIsError && __('Error loading menu', 'simplybook')}
            {!menu && __('No menu items available', 'simplybook')}
          </div>
        </Block>
    );
  }

  return (
      <Block colSpan={3} rowSpan={4} className="flex-1 max-w-xs pb-2">
        <BlockHeading title={__('Settings', 'simplybook')} controls={null} />
        <div className="flex flex-col justify-start">
          {menu.map((item) => (
              <SettingsMenuItem key={item.id} item={item} />
          ))}
        </div>
      </Block>
  );
};
export default SettingsMenu;