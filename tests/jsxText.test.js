const { transform } = require('../package/index');

test('should transform text', () => {
    const input = `<p>hello world</p>;`;
    const output = transform(input);
    expect(output.code).toBe(`<p>loc_0</p>;`);
})

test('should not transform text', () => {
    const input = `<static>hello world</static>;`;
    const output = transform(input, {
        elementsPreserveJsxText: { static: 1 }
    });
    expect(output.code).toBe(input);
})

test('should replace text with function expression', () => {
    const input = `<p>hello world</p>;`;
    const output = transform(input, {
        key: { type: 'function', functionName: 'loc' }
    });
    expect(output.code).toBe(`<p>{loc(\"loc_0\")}</p>;`);
})