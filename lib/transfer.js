const { Transformer } = require('markmap-lib')

const transfer = (markdown) => {
  //see https://markmap.js.org/docs#usage
  const transformer = new Transformer(plugins=[]);
  const { root:svgData } = transformer.transform(markdown);
  return { svgData }
}
module.exports = { transfer }