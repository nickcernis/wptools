const wporg = require('./wporg.js');

// getWPVersion()
test('WP.org returns a WP version number', () => {
    expect.assertions(1);
    return expect(wporg.getWPVersion()).resolves.toHaveLength(5);
});

// getPluginVersion()
test('WP.org returns a WooCommerce version number', () => {
    expect.assertions(1);
    return expect(wporg.getPluginVersion('woocommerce')).resolves.toHaveLength(5);
});
