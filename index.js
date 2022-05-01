const  { transfer } = require("./lib/transfer.js");
const { walkTree } = require("markmap-common");


function fold(tree, maxDepth = 0) {
  if (
    typeof maxDepth === 'undefined' ||
    typeof parseInt(maxDepth) !== 'number' ||
    maxDepth <= 0
  ) {
    return
  }
  maxDepth = parseInt(maxDepth)
  walkTree(tree, (node, next) => {
    // Here depths are in sequence of [0, 2, 4, ..., 2n]
    if (node.d >= maxDepth * 2) {
      node.p = Object.assign(node.p, { f: true });
    }
    next();
  })
}


hexo.extend.tag.register("markmap", function (args, content) {
  const { svgData } = transfer(content.trim());
  const [ height, displayDepth ] = args;
  fold(svgData, displayDepth)
  return `
    <div class="markmap-container" style="height:${height}">
      <svg data='${JSON.stringify(svgData)}'></svg>
    </div>
  `
}, { ends: true });


hexo.extend.filter.register('after_post_render', (data) => {
  if(!(data.content.includes('markmap-container'))) return data
  data.content += `
    <style>.markmap-container{display:flex;justify-content:center;margin:0 auto;width:90%;height:500px}.markmap-container svg{width:100%;height:100%}@media(max-width:768px){.markmap-container{height:400px}}</style>
    <script src="https://cdn.jsdelivr.net/npm/d3@6"></script>
    <script src="https://cdn.jsdelivr.net/npm/markmap-view@0.2.7"></script>
    <script> document.querySelectorAll('.markmap-container>svg').forEach(mindmap => markmap.Markmap.create(mindmap, null, JSON.parse(mindmap.getAttribute('data'))))</script>
  `
  return data
}, 'post');
