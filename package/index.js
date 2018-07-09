const {parse} = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generate = require('@babel/generator').default;

let _options = {};

function isPunctuation(val){
    const punctuations = ['.', ',', ';', '?', '!'];
    return punctuations.indexOf(val.trim()) >= 0;
}

function traverseAst(ast) {
    let id = 0;
    traverse(ast, {
        enter(path){
            id = replaceJsxText(path,id);
            id = replaceJsxStringAttributes(path, id);
        }
    })
}

function buildExpression(id){
    const { key } = _options;
    return t.jsxExpressionContainer(
                t.callExpression(
                    t.identifier(key.functionName),
                    [t.stringLiteral(`${key.keyName}${id++}`)]))
}

function replaceWithExpression(path, id){
    path.replaceWith(buildExpression(id));
}

function replaceJsxStringAttributes(path, id){
    const { elementsReplaceStringAttributes, key } = _options; 
    if(t.isJSXAttribute(path.node)){
        const attrsToReplace = elementsReplaceStringAttributes[path.parent.name.name];
        if(t.isStringLiteral(path.node.value) &&
           attrsToReplace &&
           attrsToReplace.indexOf(path.node.name.name) >= 0)
        {
            if(key.type === 'function') {
                path.node.value = buildExpression(id);
            }
            else {
                path.node.value = t.stringLiteral(`${key.keyName}${id++}`)
            }
        }
    }
    return id;
}

function replaceJsxText(path, id){
    const { elementsPreserveJsxText, key } = _options;

    if(t.isJSXText(path.node,{})){
        const value = path.node.value;
        if(value != null && value.trim() !== ''){
            if(t.isJSXElement(path.parent) &&
               !elementsPreserveJsxText[path.parent.openingElement.name.name] &&
               !isPunctuation(value))
            {
                if(key.type === "function") {
                    replaceWithExpression(path, id++);
                } else {
                    path.node.value = `${key.keyName}${id++}`;
                }
            }
        }
        if(value.trim() === '' && !isPunctuation(value)){
            path.node.value = value.trim();
        }
    }
    return id;
}

module.exports.transform = function(code, options = {}) {
    const defaultOptions = {
        key: {
            type: 'string',
            functionName: 'loc',
            keyName: 'loc_'
        },
        elementsReplaceStringAttributes: {},
        elementsPreserveJsxText: {}
    }
    
    _options = Object.assign(defaultOptions, {
        key: Object.assign(defaultOptions.key, options.key),
        elementsReplaceStringAttributes: Object.assign(
            defaultOptions.elementsReplaceStringAttributes,
            options.elementsReplaceStringAttributes),
        elementsPreserveJsxText: Object.assign(
            defaultOptions.elementsPreserveJsxText,
            options.elementsPreserveJsxText
        )
    });

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
        compact: "auto",
        concise: false,
        quotes: "double",
    }, code);

    return output;
}