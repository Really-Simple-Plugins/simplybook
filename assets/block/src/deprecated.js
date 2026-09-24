import { useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';

/**
 * Older versions saved an empty wrapper div. This deprecation lets the editor
 * validate that markup and migrate the block to the dynamic (null) save.
 */
const wrapperDiv = {
	attributes: metadata.attributes,
	save() {
		return <div {...useBlockProps.save()} />;
	},
};

export default [wrapperDiv];
