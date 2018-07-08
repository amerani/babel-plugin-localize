const {parse} = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generate = require('@babel/generator').default;
const options = require('./options.json');

const {
    elementsReplaceStringAttributes,
    elementsPreserveJsxText
} = options;

function loc(strings, idExp){
    return `loc_${idExp}`
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

function replaceJsxStringAttributes(path, id){
    if(t.isJSXOpeningElement(path.node,{})) {
        const attrsToReplace = elementsReplaceStringAttributes[path.node.name.name];
        if(attrsToReplace && attrsToReplace.length > 0){
            path.node.attributes.forEach(attr => {
                if(t.isStringLiteral(attr.value) &&
                   attrsToReplace.indexOf(attr.name.name) >= 0)
                {
                    attr.value.value = loc`${id++}`
                }
            })
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
                path.node.value = loc`${id++}`;
            }
        }

        if(value.trim() === '' && !isPunctuation(value)){
            path.node.value = value.trim();
        }
    }
    return id;
}

module.exports.transform = function(code) {
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