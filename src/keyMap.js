/*
** id: identifier of the keymap
** node: program node where key map is declared
** types: @babel/types
**/
function init({id, node, types:t}) {
    node.body.push(t.variableDeclaration("const", [
        t.variableDeclarator(t.identifier(id), t.objectExpression([]))
    ]))  
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
    const keyMapNode = programPath.node.body
        .reduce((acc, node) => acc.concat(node.declarations),[])
        .filter(dec => dec)
        .filter(dec => dec.id.name === id)[0];
    keyMapNode.init.properties.push(t.objectProperty(
        t.identifier(key), t.stringLiteral(value))
    ) 
}

module.exports = {
    init,
    add
}