module.exports = {
  extends: 'airbnb-base',
  env: {
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-param-reassign': 0,
  },
};
