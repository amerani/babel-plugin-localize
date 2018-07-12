const defaultOptions = {
    key: {
        type: 'string',
        functionName: 'loc',
        keyName: 'loc_'
    },
    elementsReplaceStringAttributes: {},
    elementsPreserveJsxText: {}
}

function init(options) {
    return Object.assign(defaultOptions, {
        key: Object.assign(defaultOptions.key, options.key),
        elementsReplaceStringAttributes: Object.assign(
            defaultOptions.elementsReplaceStringAttributes,
            options.elementsReplaceStringAttributes),
        elementsPreserveJsxText: Object.assign(
            defaultOptions.elementsPreserveJsxText,
            options.elementsPreserveJsxText
        )
    });
}

module.exports = {
    init
}