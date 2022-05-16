const { transfer } = require("./lib/transfer.js");
const { escapeData, fold } = require("./lib/utils.js");
const { config } = hexo

hexo.extend.tag.register("markmap", function (args, content) {
  const { svgData } = transfer(content.trim());
  const [height, displayDepth] = args;
  fold(svgData, displayDepth);
  let escapedData = escapeData(JSON.stringify(svgData));
  return `
    <div class="markmap-container" style="height:${height}">
      <svg data='${escapedData}'></svg>
    </div>
  `
}, { ends: true });


hexo.extend.filter.register('after_post_render', (data) => {
  if (!(data.content.includes('markmap-container'))) return data
  let addonScript = `
    <style>.markmap-container{display:flex;justify-content:center;margin:0 auto;width:90%;height:500px}.markmap-container svg{width:100%;height:100%}@media(max-width:768px){.markmap-container{height:400px}}</style>
    <script src="https://cdn.jsdelivr.net/npm/d3@6"></script>
    <script src="https://cdn.jsdelivr.net/npm/markmap-view@0.2.7"></script>`
  let normalInit = `<script>document.querySelectorAll('.markmap-container>svg').forEach(mindmap => markmap.Markmap.create(mindmap, null, JSON.parse(mindmap.getAttribute('data'))))</script>`
  let pjaxInit = `
    <script>
    function initMarkMap() {
      document.querySelectorAll('.markmap-container>svg').forEach(mindmap => markmap.Markmap.create(mindmap, null, JSON.parse(mindmap.getAttribute('data'))))
    }
    initMarkMap()
    let pushState = history.pushState
    history.pushState = function () {
      pushState.apply(history, arguments)
      // re-init markmap after history.pushState invoking
      initMarkMap()
    }
    </script>
  `
  data.content += addonScript + ((config?.hexo_markmap?.pjax) ?  pjaxInit : normalInit)
  return data
}, 'post');
