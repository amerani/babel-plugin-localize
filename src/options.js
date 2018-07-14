const defaultOptions = {
    elementsReplaceStringAttributes: {},
    elementsPreserveJsxText: {},
    keyPrefix: "",
    keyType: "serial",
    localizer: "localize",
    keyMapIdentifier: "localizeKeyMap",
}

function init(options) {
    return {
        ...defaultOptions,
        ...options
    }
}

module.exports = {
    init,
    defaultOptions
}