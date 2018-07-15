// export const <id> = {};
function buildNamedExport({ id, types: t }) {
  return t.exportNamedDeclaration(t.variableDeclaration('const', [
    t.variableDeclarator(t.identifier(id), t.objectExpression([])),
  ]), []);
}

// returns rhs of export const <id> = {};
function getKeyMapNode({ id, programPath, types: t }) {
  return programPath.node.body
    .filter(t.isExportNamedDeclaration)
    .filter(n => t.isVariableDeclaration(n.declaration)
                          && n.declaration.kind === 'const'
                          && n.declaration.declarations.length === 1
                          && n.declaration.declarations[0].id.name === id)
    .map(n => n.declaration.declarations[0].init)[0];
}

/*
** id: identifier of the keymap
** node: program node where key map is declared
** types: @babel/types
* */
function init({ id, node, types }) {
  const newNode = buildNamedExport({ id, types });
  node.body.push(newNode);
}

/*
** id: identifier of the keymap
** path: path of the current node
** types: @babel/types
** key: key of entry
** value: value of entry
* */
function add({
  id, path, types: t, key, value,
}) {
  const programPath = path.findParent(p => p.isProgram());
  const keyMapNode = getKeyMapNode({ id, programPath, types: t });

  keyMapNode.properties.push(t.objectProperty(
    t.identifier(key), t.stringLiteral(value),
  ));
}

module.exports = {
  init,
  add,
};
