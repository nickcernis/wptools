wptools
=======

![Travis (.org)](https://img.shields.io/travis/nickcernis/wptools.svg?style=for-the-badge) ![License](https://img.shields.io/github/license/nickcernis/wptools.svg?style=for-the-badge)

Utility functions to retrieve WordPress and plugin versions from WP.org, and 'tested up to' headers from plugin files.

Useful for automated testing, build tools, plugin status dashboards, and more. Intended for use with Node.js — not in the browser.

ISC licensed.

## Installation

~~~
$ npm install @ndc/wptools --save
~~~

## Usage

This example calls `testWordPress()` and `testWooCommerce()` to:

- Check the plugin readme.txt and PHP file for 'tested up to' and 'WC tested up to' version strings.
- Compare those versions with the latest versions of WordPress and WooCommerce fetched from the WP.org API.
- Returns true if the plugin is considered to be tested with the latest WordPress/WooCommerce, and false otherwise.
- Logs a message with the found version numbers.

~~~js
const wptools = require('wptools');
const path = require('path');

const readmePath = path.join(__dirname, '/tests/samples/readme.txt');
const pluginPath = path.join(__dirname, '/tests/samples/plugin.php');

wptools.plugin.testWordPress(readmePath).then(result => {
    console.log(
      result.pass,
      `WordPress is at ${result.version}, plugin is tested to ${result.tested}.`
    );
});

wptools.plugin.testWooCommerce(pluginPath).then(result => {
    console.log(
      result.pass,
      `WooCommerce is at ${result.version}, plugin is tested to ${result.tested}.`
    );
});
~~~

### Utility functions

wptools also exposes these utility functions:

~~~js
const wptools = require('wptools');

wptools.wporg.getWPVersion().then(v=>console.log(v));
// => (Promise, resolves to string) The latest version of WordPress core from the WP.org API. e.g. '4.9.7'.

wptools.wporg.getPluginVersion('plugin-slug').then(v=>console.log(v));
// => (Promise, resolves to string) The latest version of the given plugin from the WP.org API. e.g. '3.0.1'.

wptools.plugin.getHeader('Tested up to','/path/to/local/readme.txt');
wpt.plugin.getHeader('WC tested up to','/path/to/local/plugin.php');
// => (string) The given header value from the specified plugin file.

wptools.version.testedUpTo({version:'4.5.3', tested:'4.5'});
// => (bool) True if (tested major.minor) >= (version major.minor), and (tested _._.patch) >= (version _._patch) or (tested _._.patch) is omitted. Useful to check if a plugin is tested with the latest version of WordPress or WooCommerce.

wptools.version.majorMinorPatch('4.9.1');
// => (object) {major: 4, minor: 9, patch: 1}
~~~

## Tests

Tests are written with [Jest](https://jestjs.io/).

Run tests with:

~~~
$ npm test
~~~

Tests currently make network requests to ensure WordPress API endpoints are returning the expected JSON. TODO: mock network requests and write separate integration tests.

You can also run tests and generate a coverage report:

~~~
$ npm run coverage
~~~

## Linting

Linting uses ESLint to catch JS issues plus Prettier for auto-formatting. To auto-fix style:

~~~
$ npm run lint
~~~

## Contributing

Contributions are welcome. To install dev dependencies:

~~~
$ npm install
~~~

Please add unit tests to the `*.test.js` files in `src` for new or changed functionality.

## Release History

* 0.1.0 Initial release
