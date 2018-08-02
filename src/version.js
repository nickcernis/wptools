/**
 * Version
 * Utils for manipulating and testing version numbers.
 *
 * @module version
 */

/**
 * Create an object from the version string to help with comparisons.
 *
 * Examples:
 * `majorMinorPatch('4.5.11') // -> {major: 4, minor: 5, patch: 11}`
 * `majorMinorPatch('4.5'     // -> {major: 4, minor: 5, patch: null}`
 * `majorMinorPatch('4')      // -> {major: 4, minor: null, patch: null}`
 *
 * @param {string} version The full version number.
 * @return {object} The version as `{major: int|null, minor: int|null, patch: int|null}`.
 */
function majorMinorPatch(version) {
    if (typeof version !== 'string') {
        throw new Error(`Version must be a string, but was provided as a ${typeof version}.`);
    }
    const v = version.split('.').map(v => parseInt(v));

    return {
        major: v[0] || null,
        minor: v[1] || null,
        patch: v[2] || null,
    }
}

/**
 * Check if the 'tested' version equals or exceeds the passed 'version'.
 *
 * A 'tested' version of '4.3' will return true for all versions '4.3.x'.
 *
 * @param {object} {version: the current WordPress or WooCommerce version,
 *                  tested: the 'tested up to' version of the plugin. }
 * @returns {boolean} True if the plugin is tested up to the given version.
 */
function testedUpTo({ version = 0, tested = 0 }) {
    if (version === 0 || tested === 0) {
        throw new Error(`Versions to compare must be non-zero. Version: ${version}. Tested: ${tested}.`);
    }

    let ver = majorMinorPatch(version),
        test = majorMinorPatch(tested);

    // WP considers 'tested up to: 4.3' to be tested on all WP versions 4.3.x.
    if (test.patch === null) test.patch = Infinity;

    if (test.major >= ver.major &&
        test.minor >= ver.minor &&
        test.patch >= ver.patch) {
        return true;
    }

    return false;
}


module.exports = {
    testedUpTo: testedUpTo,
    majorMinorPatch: majorMinorPatch,
}
