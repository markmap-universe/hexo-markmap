const OpenCC = require('opencc')
const { readFile, writeFile } = require('fs').promises

const convert = async () => {
    const converter = new OpenCC('s2twp.json')
    const README_CN = await readFile('README_HANS.md', { encoding: 'utf8' })
    const converted = await converter.convertPromise(README_CN)
    await writeFile('README_HANT.md', converted)
}

convert()
