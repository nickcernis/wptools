const p = require('./plugin.js');
const path = require('path');
const readmePath = path.join(__dirname, '../tests/samples/readme.txt');
const pluginPath = path.join(__dirname, '../tests/samples/plugin.php');

// getHeader()
test('can read header from readme.txt', () => {
    expect(p.getHeader('Tested up to', readmePath)).toBe('4.9');
});

test('can read header from plugin.php', () => {
    expect(p.getHeader('WC tested up to', pluginPath)).toBe('3.4');
});

test('non existent header returns falsy', () => {
    expect(p.getHeader('No such header', readmePath)).toBeFalsy();
    expect(p.getHeader('No such header', pluginPath)).toBeFalsy();
});

test('missing files throw error', () => {
    expect(() => { p.getHeader('Tested up to', 'nopath') }).toThrow();
});

// testWordPress()
test('can compare tested up to header against latest WP', () => {
    expect.assertions(1);
    return expect(p.testWordPress(readmePath))
        .resolves.toMatchObject({
            pass: expect.any(Boolean),
            version: expect.any(String),
            tested: expect.any(String),
        });
});

// testWooCommerce()
test('can compare tested up to header against latest WooCommerce', () => {
    expect.assertions(1);
    return expect(p.testWooCommerce(pluginPath))
        .resolves.toMatchObject({
            pass: expect.any(Boolean),
            version: expect.any(String),
            tested: expect.any(String),
        });
});
