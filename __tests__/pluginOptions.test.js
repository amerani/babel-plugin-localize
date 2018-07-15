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

test('should set key prefix', () => {
  const { code } = babel.transform(example, {
    plugins: [[plugin, {
      keyPrefix: 'test',
    }]],
  });
  expect(code).toMatchSnapshot();
});

test('should set localizer', () => {
  const { code } = babel.transform(example, {
    plugins: [[plugin, {
      localizer: 'testLocalizer',
    }]],
  });
  expect(code).toMatchSnapshot();
});

test('should set localizerSource', () => {
  const { code } = babel.transform(example, {
    plugins: [[plugin, {
      localizerSource: 'testlocalizerSource',
    }]],
  });
  expect(code).toMatchSnapshot();
});

test('should set localizerBinding', () => {
  const { code } = babel.transform(example, {
    plugins: [[plugin, {
      localizerBinding: 'testlocalizerBinding',
    }]],
  });
  expect(code).toMatchSnapshot();
});

test('should set keyMapIdentifier', () => {
  const { code } = babel.transform(example, {
    plugins: [[plugin, {
      keyMapIdentifier: 'testKeyMapIdentifier',
    }]],
  });
  expect(code).toMatchSnapshot();
});
