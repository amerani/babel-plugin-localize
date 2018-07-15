const { init } = require('./keyMap');

function buildKeyMap(path, ctx) {
  init({
    id: ctx.options.keyMapIdentifier,
    node: path.node,
    types: ctx.types,
  });
}

function buildCallExpression({ types: t, options, arg }) {
  const id = options.localizer;
  return t.jsxExpressionContainer(
    t.callExpression(
      t.identifier(id),
      [t.stringLiteral(arg)],
    ),
  );
}

function buildNamedImport({ types: t, options }) {
  const { localizer, localizerSource } = options;
  return t.importDeclaration([
    t.importSpecifier(t.identifier(localizer), t.identifier(localizer)),
  ], t.stringLiteral(localizerSource));
}

function buildDefaultImport({ types: t, options }) {
  const { localizer, localizerSource } = options;
  return t.importDeclaration([
    t.importDefaultSpecifier(t.identifier(localizer)),
  ], t.stringLiteral(localizerSource));
}

function buildImports(path, ctx) {
  const { types, options } = ctx;
  const { localizerBinding } = options;
  const importNode = localizerBinding === 'default'
    ? buildDefaultImport({ types, options })
    : buildNamedImport({ types, options });
  path.node.body.unshift(importNode);
}

module.exports = {
  buildKeyMap,
  buildCallExpression,
  buildImports,
};
