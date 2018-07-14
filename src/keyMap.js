/*
** id: identifier of the keymap
** node: program node where key map is declared
** types: @babel/types
**/
function init({id, node, types:t}) {
    const lhs = t.memberExpression(t.memberExpression(
        t.identifier("module"),
        t.identifier("exports")),t.identifier(id));
    const rhs = t.objectExpression([]);
    const newNode = t.expressionStatement(t.assignmentExpression("=",lhs, rhs));

    node.body.push(newNode);
}

/* 
** id: identifier of the keymap
** path: path of the current node
** types: @babel/types
** key: key of entry
** value: value of entry
**/
function add({id, path, types:t, key, value}){
    const programPath = path.findParent(path => path.isProgram());
    const s = programPath.get('expression')
    const keyMapNode = programPath.node.body
        .filter(t.isExpressionStatement)
        .filter(n => t.isAssignmentExpression(n.expression))
        .filter(n => t.isMemberExpression(n.expression.left))
        .filter(n => n.expression.left.property.name === id)
        .map(n => n.expression.right)[0];
    
        keyMapNode.properties.push(t.objectProperty(
        t.identifier(key), t.stringLiteral(value))
    )
}

module.exports = {
    init,
    add
}