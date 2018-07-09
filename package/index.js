const {parse} = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generate = require('@babel/generator').default;

let options = {
    elementsReplaceStringAttributes: {},
    elementsPreserveJsxText: {},
    key: {
        type: "string",
        keyName: "loc_"
    }
};
const {
    elementsReplaceStringAttributes,
    elementsPreserveJsxText,
    key
} = options;
const { functionName, keyName } = key;

function loc(strings, idExp){
    return `${keyName}${idExp}`
}

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
    return t.jsxExpressionContainer(
        t.callExpression(
            t.identifier(functionName),
            [t.stringLiteral(loc`${id++}`)]))
}

function replaceWithExpression(path, id){
    path.replaceWith(buildExpression(id));
}

function replaceJsxStringAttributes(path, id){
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
                path.node.value = t.stringLiteral(loc`${id++}`)
            }
        }
    }
    return id;
}

function replaceJsxText(path, id){
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
                    path.node.value = loc`${id++}`;
                }
            }
        }
        if(value.trim() === '' && !isPunctuation(value)){
            path.node.value = value.trim();
        }
    }
    return id;
}

module.exports.transform = function(code, opt) {
    options = opt;
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