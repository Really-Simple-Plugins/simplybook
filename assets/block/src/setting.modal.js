import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import {__} from "@wordpress/i18n";
import {Modal, PanelBody, Button, SelectControl} from "@wordpress/components";

export default function SettingsModal(options) {

    var {isUserAuthorized, locations, categories, services, providers, attributes, setAttributes, closeModal, saveParameters} = options;


    return (
        <Modal
            className="sb-widget-modal"
            title={__('Edit predefined parameters', 'simplybook')}
            onRequestClose={closeModal}
        >
            <PanelBody>
                {!isUserAuthorized ? (
                    <p className="sb-widget-alert">
                        {__('You are not authorized in ', 'simplybook')}
                        <a href="/wp-admin/admin.php?page=simplybook-integration">{__('SimplyBook.me plugin', 'simplybook')}</a>
                    </p>
                ) : (
                    <>
                        <div className="wp-sb-popup-info">
                            <p className="wp-sb--p">
                                {__('This feature allows you to customize your booking widget specifically for a service, provider, category, or location.', 'simplybook')}
                            </p>
                            <p className="wp-sb--p">
                                {__('For example, if you have two services, A and B, and choose service A as predefined, the widget will open directly on that service, skipping the step of choosing a service. This is useful if you want to display only certain services on a specific page of your website. Note that if you select a provider not connected to the chosen service, the widget will not work. These settings will immediately apply to the widget, ensuring a streamlined booking process.', 'simplybook')}
                            </p>
                        </div>
                        <div className="wp-sb-popup-predefine-form">
                            {locations.length > 0 && (
                                <SelectControl
                                    label={__('Predefined location', 'simplybook')}
                                    value={attributes.location}
                                    options={[{ label: __('Select location', 'simplybook'), value: 0 }, ...locations.map(location => ({ label: location.name, value: location.id }))]}
                                    onChange={(newLocation) => setAttributes({ location: parseInt(newLocation) })}
                                />
                            )}
                            {categories.length > 0 && (
                                <SelectControl
                                    label={__('Predefined category', 'simplybook')}
                                    value={attributes.category}
                                    options={[{ label: __('Select category', 'simplybook'), value: 0 }, ...categories.map(category => ({ label: category.name, value: category.id }))]}
                                    onChange={(newCategory) => setAttributes({ category: parseInt(newCategory) })}
                                />
                            )}
                            {services.length > 0 && (
                                <SelectControl
                                    label={__('Predefined service', 'simplybook')}
                                    value={attributes.service}
                                    options={[{ label: __('Select service', 'simplybook'), value: 0 }, ...services.map(service => ({ label: service.name, value: service.id }))]}
                                    onChange={(newService) => setAttributes({ service: parseInt(newService) })}
                                />
                            )}
                            {providers.length > 0 && (
                                <SelectControl
                                    label={__('Predefined provider', 'simplybook')}
                                    value={attributes.provider}
                                    options={[{ label: __('Select provider', 'simplybook'), value: 0 }, ...providers.map(provider => ({ label: provider.name, value: provider.id }))]}
                                    onChange={(newProvider) => {
                                        if(newProvider === 'any'){
                                            setAttributes({ provider: 'any' });
                                            return
                                        }
                                        setAttributes({ provider: parseInt(newProvider) })
                                    }}
                                />
                            )}
                        </div>
                        <div className="wp-sb-popup-predefine-btnBar">
                            <Button
                                onClick={saveParameters}
                                className="sb-widget-save-btn"
                                isPrimary
                            >
                                {__('Save', 'simplybook')}
                            </Button>
                        </div>
                    </>
                )}
            </PanelBody>
        </Modal>
    );
}