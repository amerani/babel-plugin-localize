# localize
modify static strings in jsx code to localization friendly formats

## jsx text
input
```
<p>hello world</p>
<Static>hello world</Static>
```
output
```
<p>loc_0</p>
<Static>hello world</Static>
```
output: `key.type = 'function'`
```
<p>{localize('loc_0')}</p>
<Static>hello world</Static>
```

## jsx attributes
input
```
<Title name="hello world" id="title" />
```
output
```
<Title name="loc_0" id="title" />
```
output: `key.type = 'function'`
```
<Title name={localize('loc_0')} id="title" />
```

## options
```
{
    "elementsReplaceStringAttributes": {
        "Title": ["name"]
    },
    "elementsPreserveJsxText": {
        "Static": 1
    },
    "key": {
        "type": "function",
        "functionName": "localize",
        "keyName": "loc_"
    }
}
```