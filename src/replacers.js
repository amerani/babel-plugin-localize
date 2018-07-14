const { add } = require('./keyMap');
const { shouldReplaceJsxText, shouldReplaceJsxAttribute } = require('./policy');
const { buildCallExpression } = require('./builders');

function replaceJsxText(path, context) {
    const { types, options } = context
    const { keyMapIdentifier:id, keyPrefix } = options;
    
    if(shouldReplaceJsxText({path, types, options})){
        const value = path.node.value.trim();
        const key = `${keyPrefix}${context.id++}`;
        const node = buildCallExpression({
            types,
            options,
            arg: key
        })
        path.replaceWith(node);
        add({id, path, types, key, value});
    }
}

function replaceJsxAttribute(path, context) {
    const { types, options } = context
    const { keyMapIdentifier:id, keyPrefix } = options;

    if(shouldReplaceJsxAttribute({path, types, options}))
    {
        const value = path.node.value.value;
        const key = `${keyPrefix}${context.id++}`;

        path.node.value = buildCallExpression({
            types,options,arg:key
        })
        add({id, path, types, key, value});
    } 
}

module.exports = {
    replaceJsxAttribute,
    replaceJsxText
}