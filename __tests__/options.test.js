const { init, defaultOptions } = require('../src/options');

test('should be default when null', () => {
    const output = init(null);
    expect(output).toEqual(defaultOptions);
})

test('should be default when empty', () => {
    const output = init(null);
    expect(output).toEqual(defaultOptions);
})

test('should override elementsReplaceStringAttributes', () => {
    const input = {
        elementsReplaceStringAttributes: {
            input: "label"
        }
    }
    const output = init(input);
    expect(output.elementsReplaceStringAttributes).toEqual(input.elementsReplaceStringAttributes);
})

test('should override elementsPreserveJsxText', () => {
    const input = {
        elementsPreserveJsxText: {
            p: true
        }
    }
    const output = init(input);
    expect(output.elementsPreserveJsxText).toEqual(input.elementsPreserveJsxText);
})

test('should override', () => {
    const input = {
        elementsPreserveJsxText: null,
        elementsReplaceStringAttributes: null,
        keyPrefix: '__',
        keyType: "guid",
        localizer: "reactIntl",
        localizerSource: "react-intl",
        localizerBinding: "named",
        keyMapIdentifier: "keymap",        
    }
    const output = init(input);
    expect(output).toEqual(input);
})