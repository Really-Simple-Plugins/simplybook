import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Button, Dashicon } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import './editor.scss';
import SettingsModal from "./setting.modal";
import request from "../../../react/src/api/requests/request";

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const blockProps = useBlockProps();
	const [isModalOpen, setIsModalOpen] = useState(false);
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
		const fetchData = async (endpoint) => {
			return await request(endpoint, "POST");
		};

		fetchData('internal/is-authorized').then(setIsUserAuthorized);

		Promise.all([
			fetchData('internal/locations'),
			fetchData('internal/categories'),
			fetchData('internal/services'),
			fetchData('internal/providers')
		]).then(([locations, categories, services, providers]) => {
			setLocations(locations);
			setCategories(categories);
			setServices(services);
			setProviders(providers);
		});
	}, []);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

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
			<div {...blockProps}>
				<PanelBody>
					<div className={'sb-widget-container'}>
						<Dashicon icon="simplybook" size={25} className={"sb-widget-icon"}/>

						<h3 className={'wp-sb-title wp-sb-title_h3 sb-widget-title'}>{__('SimplyBook.me Widget', 'simplybook')}</h3>

						<p className={"wp-sb-txt wp-sb--p wp-sb--p_secondary --subtitle"}>
							{__('Easily customize and streamline your booking process with predefined options for services, providers, categories and locations.', 'simplybook')}
						</p>

						{!isUserAuthorized ? (
							<p className="sb-widget-alert">
								{__('You are not authorized in ', 'simplybook')}
								<a href={window.simplybook.dashboard_url}>{__('SimplyBook.me plugin', 'simplybook')}</a>
							</p>
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
			</div>
		</>
	);
}
