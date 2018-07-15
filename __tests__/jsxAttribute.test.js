const babel = require('@babel/core');
const plugin = require('../src/index');

const example = `
export default () => (
    <>
        <p>hello world</p>
        <Title id="titleId" label="lorem ipsum" />
    </>
);
`;

test('should transform attribute', () => {
  const { code } = babel.transform(example, {
    plugins: [[plugin, {
      elementsReplaceStringAttributes: {
        Title: ['label'],
      },
    }]],
  });
  expect(code).toMatchSnapshot();
});
