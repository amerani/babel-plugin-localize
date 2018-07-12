const {parse} = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generate = require('@babel/generator').default;
const { buildKeyMap } = require('../builders');
const { replaceJsxAttribute, replaceJsxText } = require('../replacers');
const { init } = require('../options');
const context = require('../context');

let _context;

function traverseAst(ast) {
    traverse(ast, {
        enter(path){
            if(t.isProgram(path.node)){
                buildKeyMap(path, _context);
            }
            if(t.isJSXAttribute(path.node)){
                replaceJsxAttribute(path, _context);
            }
            if(t.isJSXText(path.node)){
                replaceJsxText(path, _context);
            }
        }
    })
}

module.exports.transform = function(code, options = {}) {
    
    _context = new context(t, init(options));

    const ast = parse(code, { 
        sourceType: 'unambiguous',
        plugins: [
            "classProperties",
            "typescript",
            'jsx',
        ]
    });
    
    traverseAst(ast);
    
    const output = generate(ast, {
        retainLines: true,
        concise: false,
        quotes: "double",
    }, code);

    return output;
}