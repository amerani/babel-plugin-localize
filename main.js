const {readFile, writeFile, ensureFile} = require('fs-extra');
const klaw = require('klaw');
const { transform } = require('./index');

klaw('./src')
.on('data', async item => {
    if(item.path.endsWith('.js') || item.path.endsWith('.tsx')){
        const file = item.path;
        const code = await readFile(file, 'utf-8');
        const output = transform(code);
        const outFile = file.replace('/src/', '/dist/');
        await ensureFile(outFile);
        await writeFile(outFile, output.code, {encoding:'utf-8'});
    }
});