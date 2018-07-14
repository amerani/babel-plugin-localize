const babel = require('@babel/core');
const plugin = require('../src/index');

const example = `
export default () => (
    <>
        <p>hello world</p>
        <Title id="titleId" label="lorem ipsum" />
    </>
);
`

test('shoud set key prefix', () => {
    const { code } = babel.transform(example, {plugins:[[plugin, {
        "keyPrefix": "test"
    }]]});
    expect(code).toMatchSnapshot();
})

test('shoud set localizer', () => {
    const { code } = babel.transform(example, {plugins:[[plugin, {
        "localizer": "testLocalizer"
    }]]});
    expect(code).toMatchSnapshot();
})

test('shoud set keyMapIdentifier', () => {
    const { code } = babel.transform(example, {plugins:[[plugin, {
        "keyMapIdentifier": "testKeyMapIdentifier"
    }]]});
    expect(code).toMatchSnapshot();
})