const {readFile, writeFile, ensureFile} = require('fs-extra');
const klaw = require('klaw');
const { transform } = require('../../package/index');
const path = require('path');

klaw(path.resolve(__dirname, 'src'))
.on('data', async item => {
    if(item.path.endsWith('.js') || item.path.endsWith('.tsx')){
        const file = item.path;
        const code = await readFile(file, 'utf-8');
        const output = transform(code, {
            "elementsReplaceStringAttributes": {
                "LabelProvider": ["label"]
            },
            "elementsPreserveJsxText": {
                "PreserveMyText": 1
            }
        });
        const outFile = file.replace('/src/', '/mod/');
        await ensureFile(outFile);
        await writeFile(outFile, output.code, {encoding:'utf-8'});
    }
});