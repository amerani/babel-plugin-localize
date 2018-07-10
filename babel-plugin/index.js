let id = 0;
const punctuations = ['.', ',', ';', '?', '!'];

function addToKeyMap(t, path, key, value) {
    const programPath = path.findParent(path => path.isProgram());
    const keyMapNode = programPath.node.body
        .reduce((acc, node) => acc.concat(node.declarations),[])
        .filter(dec => dec)
        .filter(dec => dec.id.name === 'keyMap')[0];
    keyMapNode.init.properties.push(t.objectProperty(
        t.identifier(key), t.stringLiteral(value))
    )
}

module.exports = function({types:t}){
    const isPunctuation = (value) => punctuations.indexOf(value.trim()) >= 0;
    return {
        manipulateOptions(opts, parserOpts) {
            parserOpts.plugins.push('classProperties', 'typescript', 'jsx')
        },
        visitor: {
            Program(path) {
                path.node.body.push(t.variableDeclaration("const", [
                    t.variableDeclarator(t.identifier("keyMap"), t.objectExpression([]))
                ]))
            },
            JSXText(path, state) {
                const {
                    elementsPreserveJsxText,
                    key
                } = state.opts;
                const value = path.node.value;
                if(value != null && value.trim() !== ''){
                    if(t.isJSXElement(path.parent) &&
                       !elementsPreserveJsxText[path.parent.openingElement.name.name] &&
                       !isPunctuation(value))
                    {
                        const replacedValue = value.trim();
                        const locKey = `${key.keyName}${id++}`;
                        if(key.type === "function") {
                            path.replaceWith(t.jsxExpressionContainer(
                                t.callExpression(
                                    t.identifier(key.functionName),
                                    [t.stringLiteral(locKey)])));
                        } else {
                            path.node.value = locKey;
                        }
                        addToKeyMap(t, path, locKey, replacedValue);
                    }
                }
                if(value.trim() === '' && !isPunctuation(value)){
                    path.node.value = value.trim();
                }
            },
            JSXAttribute(path, state) {
                const {
                    elementsReplaceStringAttributes,
                    key
                } = state.opts;

                const attrsToReplace = elementsReplaceStringAttributes[path.parent.name.name];
                if(t.isStringLiteral(path.node.value) &&
                   attrsToReplace &&
                   attrsToReplace.indexOf(path.node.name.name) >= 0)
                {
                    const replacedValue = path.node.value.value;
                    const locKey = `${key.keyName}${id++}`;
                    if(key.type === 'function') {
                        path.node.value = t.jsxExpressionContainer(
                            t.callExpression(
                                t.identifier(key.functionName),
                                [t.stringLiteral(locKey)]));
                    }
                    else {
                        path.node.value = t.stringLiteral(locKey)
                    }
                    addToKeyMap(t, path, locKey, replacedValue)
                }                
            }
        }
    }
}