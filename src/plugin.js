const { buildKeyMap } = require('./builders');
const { replaceJsxAttribute, replaceJsxText } = require('./replacers');
const context = require('./context');

const _context = new context();

module.exports = function({types}){
    _context.types = types;
    return {
        manipulateOptions(opts, parserOpts) {
            parserOpts.plugins.push('classProperties', 'typescript', 'jsx')
        },
        visitor: {
            Program(path, state) {
                _context.setOptions = state.opts;
                buildKeyMap(path, _context);
            },
            JSXText(path, state) {
                _context.setOptions = state.opts;
                replaceJsxText(path, _context);
            },
            JSXAttribute(path, state) {
                _context.setOptions = state.opts;
                replaceJsxAttribute(path, _context);
            }
        }
    }
}