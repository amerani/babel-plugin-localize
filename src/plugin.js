const { buildKeyMap, buildImports } = require('./builders');
const { replaceJsxAttribute, replaceJsxText } = require('./replacers');
const Context = require('./context');

const ctx = new Context();

module.exports = function ({ types }) {
  ctx.types = types;
  return {
    manipulateOptions(_, parserOpts) {
      parserOpts.plugins.push('classProperties', 'typescript', 'jsx');
    },
    visitor: {
      Program(path, state) {
        ctx.setOptions = state.opts;
        buildImports(path, ctx);
        buildKeyMap(path, ctx);
      },
      JSXText(path, state) {
        ctx.setOptions = state.opts;
        replaceJsxText(path, ctx);
      },
      JSXAttribute(path, state) {
        ctx.setOptions = state.opts;
        replaceJsxAttribute(path, ctx);
      },
    },
  };
};
