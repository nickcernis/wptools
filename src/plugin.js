/**
 * Plugin
 * Utils for reading header info from local files, and checking 'tested up to'
 * versions against the latest WordPress and WooCommerce.
 *
 * @module plugin
 */
const v = require('./version.js');
const wporg = require('./wporg.js');

/**
 * Get provided header from a given file.
 * @param {string} headerText The header label, excluding the colon.
 * @param {string} filePath The full path to the file containing the header.
 * @return {string|undefined} The header value if found.
 */
function getHeader(headerText, filePath) {
    const fs = require('fs');

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const regex = new RegExp('^' + headerText + ':(.*)$', 'mi');
    const header = fileContents.match(regex);

    if (header && header.length > 1) {
        return header[1].trim();
    }

    console.log(`No '${headerText}' header found in ${filePath}.`);
}

/**
 * Check if a plugin is tested with the latest version of WordPress.
 *
 * Assumes the plugin's readme.txt contains a 'Tested up to' header.
 *
 * @param {string} readmePath The full path to the local plugin readme.
 * @return {Promise} Async, returns an object with pass, version, and tested.
 */
function testWordPress(readmePath) {
    const pluginTestedTo = getHeader('Tested up to', readmePath);
    if (!pluginTestedTo) {
        throw new Error(`Could not find 'Tested up to' in ${readmePath}.`);
    }

    return wporg.getWPVersion().then(latestWpVersion => {
        const tested = v.testedUpTo({ version: latestWpVersion, tested: pluginTestedTo });
        return {
            pass: tested,
            version: latestWpVersion,
            tested: pluginTestedTo
        };
    });
}

/**
 * Check if a plugin is tested with the latest version of WooCommerce.
 *
 * Assumes the plugin's PHP file contains a 'WC tested up to' header.
 *
 * @param {string} pluginPath The full path to the plugin's main PHP file.
 * @return {Promise} Async, returns an object with pass, version, and tested.
 */
function testWooCommerce(pluginPath) {
    const pluginTestedTo = getHeader('WC tested up to', pluginPath);
    if (!pluginTestedTo) {
        throw new Error(`Could not find 'WC tested up to' header in ${pluginPath}.`);
    }

    return wporg.getPluginVersion('woocommerce').then(wooVersion => {
        const tested = v.testedUpTo({ version: wooVersion, tested: pluginTestedTo });
        // console.log(tested, `WooCommerce at ${version}, plugin is tested to Woo ${pluginTestedTo}.`);
        return {
            pass: tested,
            version: wooVersion,
            tested: pluginTestedTo
        };
    });
}


module.exports = {
    getHeader: getHeader,
    testWordPress: testWordPress,
    testWooCommerce: testWooCommerce,
};
