const wporg = require("./wporg.js");

// getWPVersion()
test("WP.org returns a WP version number", () => {
  expect.assertions(1);
  return expect(wporg.getWPVersion()).resolves.toMatch(/^\d+\./);
});

// getPluginVersion()
test("WP.org returns a WooCommerce version number", () => {
  expect.assertions(1);
  return expect(wporg.getPluginVersion("woocommerce")).resolves.toMatch(
    /^\d+\./
  );
});
