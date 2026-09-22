import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
	apiVersion: metadata.apiVersion,
	edit: Edit,
	save,
	attributes: metadata.attributes,
});
