const { add } = require('./keyMap');
const { shouldReplaceJsxText, shouldReplaceJsxAttribute } = require('./policy');
const { buildCallExpression } = require('./builders');

function replaceJsxText(path, context) {
    const { types, options } = context
    if(shouldReplaceJsxText({path, types, options})){
        const value = path.node.value.trim();
        const key = `${options.key.keyName}${context.id++}`;
    
        if(options.key.type === "function") {
            const node = buildCallExpression({
                types,
                options,
                arg: key
            })
            path.replaceWith(node);
        } else {
            path.node.value = key;
        }
        add({id:'keyMap', path, types, key, value});
    }
    // if(value.trim() === '' && !isPunctuation(value)){
    //     path.node.value = value.trim();
    // }
}

function replaceJsxAttribute(path, context) {
    const { types, options } = context
    if(shouldReplaceJsxAttribute({path, types, options}))
    {
        const value = path.node.value.value;
        const key = `${options.key.keyName}${context.id++}`;
        if(options.key.type === 'function') {
            path.node.value = buildCallExpression({
                types,options,arg:key
            })
        }
        else {
            path.node.value = types.stringLiteral(key)
        }
        add({id:'keyMap', path, types, key, value});
    } 
}

module.exports = {
    replaceJsxAttribute,
    replaceJsxText
}