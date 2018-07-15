const babel = require('@babel/core');
const plugin = require('../src/index');

const example = `
export default () => (<p>hello world</p>);
`;

test('should import localizer', () => {
  const { code } = babel.transform(example, { plugins: [plugin] });
  expect(code).toMatchSnapshot();
});

test('should import default localizer', () => {
  const { code } = babel.transform(example, {
    plugins: [[plugin, {
      localizerBinding: 'default',
    }]],
  });
  expect(code).toMatchSnapshot();
});
