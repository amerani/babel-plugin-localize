# babel-plugin-localize
modify static strings in jsx code to localization friendly formats

## example

input
```jsx
const jsxText = (
    <>
    <p>hello world</p>
    <Static>hello world</Static>
    </>
);
const jsxAttribute = (
    <Title name="awesome" id="title" />
);

```
output
```jsx
import { localizer } from './localizer';

const jsxText = (
    <>
    <p>{localize("loc_0")}</p>
    <Static>hello world</Static>
    </>
);
const jsxAttribute = (
    <Title name={localize("loc_1")} id="title" />
);

export const localizeKeyMap = {
  "loc_0": "hello world",
  "loc_1": "awesome"
};
```

## options
```json
{
    "elementsReplaceStringAttributes": {
        "Title": ["name"]
    },
    "elementsPreserveJsxText": {
        "Static": true
    },
    "keyPrefix": "loc_",
    "keyType": "serial",
    "localizer": "localize",
    "localizerBinding": "named",
    "localizerSource": "./localizer",
    "keyMapIdentifier": "localizeKeyMap"
}
```

## installation
npm
```sh
npm install --save-dev babel-plugin-localize
```
yarn
```sh
yarn add -D babel-plugin-localize
```

## usage

### via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": [["localize", {}]]
}
```

### via CLI

```sh
babel --plugins localize script.js
```

### via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: [["localize", {}]]
});
```