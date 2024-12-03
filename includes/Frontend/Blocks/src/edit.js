import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, BlockControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, TextControl, Modal, Button, SelectControl, Dashicon, IconButton, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import './editor.scss';
import SettingsModal from "./setting.modal";
import React from "react";

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const blockProps = useBlockProps();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [isUserAuthorized, setIsUserAuthorized] = useState(false);
	const [locations, setLocations] = useState([]);
	const [categories, setCategories] = useState([]);
	const [services, setServices] = useState([]);
	const [providers, setProviders] = useState([]);
	const [modalContent, setModalContent] = useState('');
	const previewModal = React.createRef();

	const apiUrl = '/wp-json/simplybook/';

	useEffect(() => {
		const fetchData = async (endpoint) => {
			const response = await fetch(apiUrl + endpoint);
			const data = await response.json();
			return data;
		};

		fetchData('is-authorized').then(setIsUserAuthorized);

		if (isUserAuthorized) {
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
		}
	}, [isUserAuthorized]);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const openPreview = () => setIsPreviewOpen(true);
	const closePreview = () => setIsPreviewOpen(false);


	const saveParameters = () => {
		setAttributes(attributes);
		closeModal();
	};

	const getBlockControls = () => (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton onClick={() => previewWidget()} icon="visibility">
					{__('Preview', 'simplybook')}
				</ToolbarButton>
			</ToolbarGroup>
		</BlockControls>
	);


	const previewWidget = () => {
		console.log('preview');
		let ajaxUrl = '/wp-admin/admin-ajax.php';

		let formData = new FormData();

		//action: sb_preview_widget
		//formData[predefined][provider]
		//formData[predefined][service]
		//formData[predefined][category]
		//formData[predefined][location]

		formData.append('action', 'sb_preview_widget');
		if(attributes.location) {
			formData.append('formData[predefined][location]', attributes.location);
		}
		if(attributes.category) {
			formData.append('formData[predefined][category]', attributes.category);
		}
		if(attributes.service) {
			formData.append('formData[predefined][service]', attributes.service);
		}
		if(attributes.provider) {
			formData.append('formData[predefined][provider]', attributes.provider);
		}
		formData.append('_wpnonce', window.simplybookData?.nonce);

		//convert to string  'orem=ipsum&name=binny';
		formData = new URLSearchParams(formData).toString();


		let xhr = new XMLHttpRequest();
		xhr.open('POST', ajaxUrl, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				console.log(xhr.responseText);
				var data = JSON.parse(xhr.responseText);

				if(data && data.html){
					//add html to modal by ref
					setModalContent(data.html);
					openPreview();

					setTimeout(() => {
						var scripts = document.getElementById('simplybook-preview-modal').getElementsByTagName('script');
						//check if script exists
						if(scripts.length === 0){
							console.warn('No script found in widget preview');
							return;
						}
						//replace event DOMContentLoaded to custom event
						var scriptContent = scripts[0].innerHTML.replace('DOMContentLoaded', 'sbDOMContentLoaded');
						window.eval(scriptContent);
						//trigger custom event
						var event = new Event('sbDOMContentLoaded');
						document.dispatchEvent(event);
					}, 300);
				}
			}
		};
		xhr.send(formData);
	}

	return (
		<>
			{getBlockControls()}
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
								<a href="/wp-admin/admin.php?page=simplybook-integration">{__('SimplyBook.me plugin', 'simplybook')}</a>
							</p>
						) : (
							<>
								{locations.length > 0 && attributes.location ? (
									<p className="wp-sb--p sb-widget-predefined sb-widget-location">
										{__('Location: ', 'simplybook') + locations.find(loc => loc.id === attributes.location).name}
									</p>
								) : null}
								{categories.length > 0 && attributes.category ? (
									<p className="wp-sb--p sb-widget-predefined sb-widget-category">
										{__('Category: ', 'simplybook') + categories.find(cat => cat.id === attributes.category).name}
									</p>
								) : null}
								{services.length > 0 && attributes.service ? (
									<p className="wp-sb--p sb-widget-predefined sb-widget-service">
										{__('Service: ', 'simplybook') + services.find(serv => serv.id === attributes.service).name}
									</p>
								) : null}
								{providers.length > 0 && attributes.provider ? (
									<p className="wp-sb--p sb-widget-predefined sb-widget-provider">
										{__('Provider: ', 'simplybook') + providers.find(prov => prov.id === attributes.provider).name}
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

				{isPreviewOpen &&
					<Modal className="sb-widget-modal sb-widget-preview-modal"
						   title={__('WidgetPreview', 'simplybook')}
						   onRequestClose={closePreview}
						   ref={previewModal}
					>
						<PanelBody>
							<div dangerouslySetInnerHTML={{__html: modalContent}}
								 id="simplybook-preview-modal" />
						</PanelBody>
					</Modal>
				}


				{/*<InnerBlocks />*/}
			</div>
		</>
	);
}
