const { init } = require('./keyMap');

function buildKeyMap(path, ctx) {
    ctx.id = 0;
    init({
        id: 'keyMap',
        node: path.node,
        types: ctx.types
    });
}

function buildCallExpression({types:t, options, arg}) {
    const id = options.key.functionName;
    return t.jsxExpressionContainer(
        t.callExpression(
            t.identifier(id),
            [t.stringLiteral(arg)]))
}

module.exports = {
    buildKeyMap, 
    buildCallExpression
}