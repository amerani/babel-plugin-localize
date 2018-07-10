let id = 0;
const punctuations = ['.', ',', ';', '?', '!'];

module.exports = function({types:t}){
    const isPunctuation = (value) => punctuations.indexOf(value.trim()) >= 0;
    return {
        manipulateOptions(opts, parserOpts) {
            parserOpts.plugins.push('classProperties', 'typescript', 'jsx')
        },
        visitor: {
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
                        if(key.type === "function") {
                            path.replaceWith(t.jsxExpressionContainer(
                                t.callExpression(
                                    t.identifier(key.functionName),
                                    [t.stringLiteral(`${key.keyName}${id++}`)])));
                        } else {
                            path.node.value = `${keyName}${id++}`;
                        }
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
                    if(key.type === 'function') {
                        path.node.value = t.jsxExpressionContainer(
                            t.callExpression(
                                t.identifier(key.functionName),
                                [t.stringLiteral(`${key.keyName}${id++}`)]));
                    }
                    else {
                        path.node.value = t.stringLiteral(`${key.keyName}${id++}`)
                    }
                }                
            }
        }
    }
}