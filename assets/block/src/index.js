import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import deprecated from './deprecated';
import metadata from './block.json';
import icon from './icon';

registerBlockType(metadata.name, {
	apiVersion: metadata.apiVersion,
	edit: Edit,
	save,
	deprecated,
	attributes: metadata.attributes,
	icon,
});
