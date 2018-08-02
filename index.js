/**
 * wptools
 * Utils for reading header info from local files, and checking 'tested up to'
 * versions against the latest WordPress and WooCommerce.
 *
 * @module wptools
 */
const plugin = require('./src/plugin.js');
const wporg = require('./src/wporg.js');
const v = require('./src/version.js');

wptools = {
    plugin: plugin,
    wporg: wporg,
    version: v,
};

module.exports = wptools;
