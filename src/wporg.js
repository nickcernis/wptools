/**
 * wporg
 * Fetch data from the WordPress.org API.
 *
 * @module wporg
 * @see https://codex.wordpress.org/WordPress.org_API
 */

const axios = require('axios');

/**
 * Get current WordPress version from the WP.org API.
 *
 * @returns {Promise} Resolves to the version number.
 */
function getWPVersion() {
    return axios.get('https://api.wordpress.org/core/version-check/1.7/')
        .then(response => {
            return response.data.offers[0].version;
        });
}

/**
 * Get latest version of given plugin.
 *
 * @returns {Promise} Resolves to the version number.
 */
function getPluginVersion(pluginSlug) {
    return axios.get(`https://api.wordpress.org/plugins/info/1.0/${pluginSlug}.json`)
        .then(response => {
            return response.data.version;
        });
}

module.exports = {
    getWPVersion: getWPVersion,
    getPluginVersion: getPluginVersion,
};
