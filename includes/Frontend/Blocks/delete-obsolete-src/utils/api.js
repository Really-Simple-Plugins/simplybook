import apiFetch from '@wordpress/api-fetch';
/**
 * Get the html for the simplybook embed
 *
 */
export const getEmbedData = () => {
    return apiFetch( { path: 'simplybook/v1/embed' } ).then((response) => {
        console.log(response);
        return response;
    }).catch((error) => {
        console.log('rest request for simplybook/v1/embed failed');
    });
};
