const {parse} = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generate = require('@babel/generator').default;

const code = `<Hello id="test">test</Hello>`;

const ast = parse(code, {
    sourceType: 'unambiguous',
    plugins: ['jsx']
})
traverse(ast, {
    enter(path){
        if(t.isJSXText(path.node)){
            path.replaceWith(t.jsxExpressionContainer(
                t.callExpression(
                    t.identifier("loc"),
                    [t.stringLiteral("newkey")])));
        }
        if(t.isJSXAttribute(path.node)){
            path.node.value = t.jsxExpressionContainer(
                t.callExpression(
                    t.identifier("loc"),
                    [t.stringLiteral("newkey")]));
        }
    }
})

const output = generate(ast, {
    retainLines: true,
    compact: "auto",
    concise: false,
    quotes: "double",
}, code);

console.log(output.code);