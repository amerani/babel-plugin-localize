const { buildKeyMap } = require('./builders');
const { replaceJsxAttribute, replaceJsxText } = require('./replacers');
const { init } = require('./options');
const context = require('./context');

let _context;
function setOptions(options) {
    _context.options = init(options);
}

module.exports = function({types:t}){
    return {
        manipulateOptions(opts, parserOpts) {
            parserOpts.plugins.push('classProperties', 'typescript', 'jsx')
        },
        visitor: {
            Program(path) {
                _context = new context(t, {});
                buildKeyMap(path, _context);
            },
            JSXText(path, state) {
                setOptions(state.opts);
                replaceJsxText(path, _context);
            },
            JSXAttribute(path, state) {
                setOptions(state.opts);
                replaceJsxAttribute(path, _context);
            }
        }
    }
}