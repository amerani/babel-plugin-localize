const { transform } = require('../package/index');

test('should transform string attribute', () => {
    const input = `<Title name="hello world" />;`;
    const output = transform(input, {
        elementsReplaceStringAttributes: {
            Title: ['name']
        }
    });
    expect(output.code).toBe(`<Title name="loc_0" />;const keyMap = { loc_0: \"hello world\" };`);
})

test('should only transform specified string attribute', () => {
    const input = `<Title name="hello world" id="title" />;`;
    const output = transform(input, {
        elementsReplaceStringAttributes: {
            Title: ['name']
        }
    });
    expect(output.code).toBe(`<Title name="loc_0" id="title" />;const keyMap = { loc_0: \"hello world\" };`);
})

test('should not transform string attribute', () => {
    const input = `<div id="myId"></div>;`;
    const output = transform(input);
    expect(output.code).toBe(`${input}const keyMap = {};`);
})

test('should not transform bool attribute', () => {
    const input = `<Nav show={false} />;`
    const output = transform(input);
    expect(output.code).toBe(`${input}const keyMap = {};`);
})

test('should replace string attribute with function expression', () => {
    const input = `<Title name="hello world" />;`;
    const output = transform(input, {
        elementsReplaceStringAttributes: {
            Title: ['name']
        },
        key: { type: 'function' }
    });
    expect(output.code).toBe(`<Title name={loc(\"loc_0\")} />;const keyMap = { loc_0: \"hello world\" };`);
})