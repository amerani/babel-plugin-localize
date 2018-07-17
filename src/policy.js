const { isPunctuation } = require('./utils');

function shouldReplaceJsxText({ path, types: t, options }) {
  const { elementsPreserveJsxText } = options;
  const { value } = path.node;

  return value != null
            && value.trim() !== ''
            && t.isJSXElement(path.parent)
            && !elementsPreserveJsxText[path.parent.openingElement.name.name]
            && !isPunctuation(value);
}

function shouldReplaceJsxAttribute({ path, types: t, options }) {
  const { elementsReplaceStringAttributes } = options;
  const parentName = path.parent.name.name;
  const attrs = elementsReplaceStringAttributes[parentName];
  const attrName = path.node.name.name;

  return t.isStringLiteral(path.node.value)
            && attrs
            && attrs.includes(attrName);
}

module.exports = {
  shouldReplaceJsxText,
  shouldReplaceJsxAttribute,
};
