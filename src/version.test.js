const v = require('./version.js');

// testedUpTo()
test('tested versions return true', () => {
    expect(v.testedUpTo({ version: '4.3.5', tested: '4.3' })).toBe(true);
    expect(v.testedUpTo({ version: '4.3.5', tested: '4.4' })).toBe(true);
    expect(v.testedUpTo({ version: '4.3.5', tested: '4.3.11' })).toBe(true);
});

test('untested versions return false', () => {
    expect(v.testedUpTo({ version: '4.3.5', tested: '4.3.4' })).toBe(false);
    expect(v.testedUpTo({ version: '4.4.1', tested: '4.3.11' })).toBe(false);
    expect(v.testedUpTo({ version: '4.3', tested: '4.2' })).toBe(false);
    expect(v.testedUpTo({ version: '4.3', tested: '4.2.11' })).toBe(false);
});

test('zero version throws error', () => {
    expect(() => { v.testedUpTo({ version: 0, tested: '4.3.4' }) }).toThrow('must be non-zero');
    expect(() => { v.testedUpTo({ version: '1.2.3', tested: 0 }) }).toThrow('must be non-zero');
    expect(() => { v.testedUpTo({ version: 0, tested: 0 }) }).toThrow('must be non-zero');
});

// majorMinorPatch()
test('version as string returns object', () => {
    expect(v.majorMinorPatch('4.5.11')).toMatchObject({ major: 4, minor: 5, patch: 11 });
    expect(v.majorMinorPatch('4.5')).toMatchObject({ major: 4, minor: 5, patch: null });
    expect(v.majorMinorPatch('4')).toMatchObject({ major: 4, minor: null, patch: null });
});

test('version as non-string throws error', () => {
    expect(() => { v.majorMinorPatch(4.5) }).toThrow('must be a string');
    expect(() => { v.majorMinorPatch(0) }).toThrow('must be a string');
    expect(() => { v.majorMinorPatch(undefined) }).toThrow('must be a string');
});
