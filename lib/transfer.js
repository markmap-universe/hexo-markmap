const {Transformer} = require('markmap-lib')

let transfer = (markdown) => {
    const transformer = new Transformer(plugins=[]);
    const { root, features } = transformer.transform(markdown);
    // const { scripts, styles } = transformer.getUsedAssets(features);
    let dataset = {
        svgjson: `${JSON.stringify(root)}`,
        // styles: styles.map((style) => `<link rel="stylesheet" href="${style.data.href}">`),
        // script: scripts.filter(script => script.type == "script").map((script) => {
        //         let defer = script.data.defer ? "defer" : "";
        //         return `<script src="${script.data.src}" ${defer}></script>`
        // }),
    }
    return dataset
}
module.exports = {transfer}