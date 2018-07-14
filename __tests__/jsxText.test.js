const babel = require('@babel/core');
const plugin = require('../src/index');

const example = `
export default () => (
    <>
        <p>hello world</p>
        <static>special text</static>
    </>
);
`

test('should transform text', () => {
    const { code } = babel.transform(example, {plugins:[[plugin, {
        "elementsPreserveJsxText": {
            "static": true
        }
    }]]});
    expect(code).toMatchSnapshot();
})