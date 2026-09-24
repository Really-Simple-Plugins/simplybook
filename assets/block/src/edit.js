import { __ } from '@wordpress/i18n';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Button, Icon, Modal, Notice, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import './editor.scss';
import SettingsModal from "./setting.modal";
import apiFetch from '@wordpress/api-fetch';
import icon from './icon';

const previewAttributes = ['location', 'category', 'service', 'provider'];

const fetchData = (endpoint) => apiFetch({
	path: `${window.simplybook.rest_namespace}/${window.simplybook.rest_version}/internal/${endpoint}`,
});

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const blockProps = useBlockProps();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [previewUrl, setPreviewUrl] = useState(null);
	const [isUserAuthorized, setIsUserAuthorized] = useState(false);
	const [locations, setLocations] = useState([]);
	const [categories, setCategories] = useState([]);
	const [services, setServices] = useState([]);
	const [providers, setProviders] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedService, setSelectedService] = useState(null);
	const [selectedProvider, setSelectedProvider] = useState(null);

	useEffect(() => {
		fetchData('is-authorized').then(setIsUserAuthorized);

		Promise.all([
			fetchData('locations'),
			fetchData('categories'),
			fetchData('services'),
			fetchData('providers')
		]).then(([locations, categories, services, providers]) => {
			setLocations(locations);
			setCategories(categories);
			setServices(services);
			setProviders(providers);
		});
	}, []);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	const closePreview = () => setPreviewUrl(null);

	const openPreview = () => {
		const url = new URL(window.simplybook.preview_url);

		previewAttributes.forEach(attribute => {
			const value = attributes[attribute];
			if (value && value !== '0') {
				url.searchParams.set(attribute, String(value));
			}
		});

		setPreviewUrl(url.toString());
	};

	useEffect(() => {
		if (locations.length > 0) {
			const location = locations.find(loc => loc.id === attributes.location);
			setSelectedLocation(location ? location.name : null);
		}
		if (categories.length > 0) {
			const category = categories.find(cat => cat.id === attributes.category);
			setSelectedCategory(category ? category.name : null);
		}
		if (services.length > 0) {
			const service = services.find(serv => serv.id === attributes.service);
			setSelectedService(service ? service.name : null);
		}
		if (providers.length > 0) {
			const provider = providers.find(prov => String(prov.id) === String(attributes.provider));
			setSelectedProvider(provider ? provider.name : null);
		}
	}, [locations, categories, services, providers, attributes]);

	const saveParameters = () => {
		setAttributes(attributes);
		closeModal();
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon="visibility"
						disabled={!isUserAuthorized}
						onClick={openPreview}
					>
						{__('Preview', 'simplybook')}
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<div {...blockProps}>
				<PanelBody>
					<div className={'sb-widget-container'}>
						<Icon icon={icon} size={25} className={"sb-widget-icon"}/>

						<h3 className={'wp-sb-title wp-sb-title_h3 sb-widget-title'}>{__('SimplyBook.me Booking Widget', 'simplybook')}</h3>

						<p className={"wp-sb-txt wp-sb--p wp-sb--p_secondary --subtitle"}>
							{__('Easily customize and streamline your booking process with predefined options for services, providers, categories and locations.', 'simplybook')}
						</p>

						{!isUserAuthorized ? (
							<Notice status="warning" isDismissible={false} className="sb-widget-alert">
								{__('Connect your SimplyBook.me account to show the booking widget.', 'simplybook')}
								{' '}
								<a href={window.simplybook.dashboard_url} target="_top">{__('Open the SimplyBook.me settings', 'simplybook')}</a>
							</Notice>
						) : (
							<>
								{selectedLocation ? (
									<p className="wp-sb--p sb-widget-predefined sb-widget-location">
										{__('Location: ', 'simplybook') + selectedLocation}
									</p>
								) : null}
								{selectedCategory ? (
									<p className="wp-sb--p sb-widget-predefined sb-widget-category">
										{__('Category: ', 'simplybook') + selectedCategory}
									</p>
								) : null}
								{selectedService ? (
									<p className="wp-sb--p sb-widget-predefined sb-widget-service">
										{__('Service: ', 'simplybook') + selectedService}
									</p>
								) : null}
								{selectedProvider ? (
									<p className="wp-sb--p sb-widget-predefined sb-widget-provider">
										{__('Provider: ', 'simplybook') + selectedProvider}
									</p>
								) : null}
								<Button
									onClick={openModal}
									className="sb-widget-edit-btn"
									isPrimary={true}
								>
									{__('Edit predefined parameters', 'simplybook')}
								</Button>

								<div style={{clear: 'both'}}/>
							</>
						)}

					</div>
				</PanelBody>
				{isModalOpen &&
					<SettingsModal isUserAuthorized={isUserAuthorized} locations={locations} categories={categories} services={services} providers={providers} attributes={attributes} setAttributes={setAttributes} saveParameters={saveParameters} closeModal={closeModal}/>
				}
				{previewUrl &&
					<Modal
						className="sb-widget-preview-modal"
						title={__('Widget preview', 'simplybook')}
						onRequestClose={closePreview}
					>
						<iframe
							className="sb-widget-preview-frame"
							src={previewUrl}
							title={__('SimplyBook.me widget preview', 'simplybook')}
							referrerPolicy="no-referrer"
						/>
					</Modal>
				}
			</div>
		</>
	);
}
