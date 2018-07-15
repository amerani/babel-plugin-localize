const defaultOptions = {
  elementsReplaceStringAttributes: {},
  elementsPreserveJsxText: {},
  keyPrefix: '',
  keyType: 'serial',
  localizer: 'localize',
  localizerSource: './localizer',
  localizerBinding: 'named',
  keyMapIdentifier: 'localizeKeyMap',
};

function init(options) {
  return {
    ...defaultOptions,
    ...options,
  };
}

module.exports = {
  init,
  defaultOptions,
};
