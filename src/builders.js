const { init } = require('./keyMap');

function buildKeyMap(path, ctx) {
    init({
        id: ctx.options.keyMapIdentifier,
        node: path.node,
        types: ctx.types
    });
}

function buildCallExpression({types:t, options, arg}) {
    const id = options.localizer;
    return t.jsxExpressionContainer(
        t.callExpression(
            t.identifier(id),
            [t.stringLiteral(arg)]))
}

module.exports = {
    buildKeyMap, 
    buildCallExpression
}