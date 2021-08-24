const  { transfer } = require("./lib/transfer.js");


hexo.extend.tag.register("markmap", function (args, content) {
  let code = transfer(`${content.trim()}`);
  let html = `<div class="markmap-container" style="height:${args[0]}">
                <svg class="markmap-svg">${code.svgjson}</svg>
              </div>`
  return html;
}, { ends: true });


hexo.extend.injector.register('body_end', () => {
  return `
  <script src="https://cdn.jsdelivr.net/npm/d3@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/markmap-lib@0.7.4/dist/browser/view.min.js"></script>
  <script>
    const mindmaps = document.querySelectorAll('.markmap-svg');
    for(let mindmap of mindmaps) {
        markmap.markmap(mindmap, JSON.parse(mindmap.innerHTML));
    }
  </script> `
}, 'post');

hexo.extend.filter.register('after_post_render', (data) => {
  let css = `<style>.markmap-container{display:flex;justify-content:center;margin:0 auto;width:90%;height:500px}.markmap-container svg{width:100%;height:100%}@media(max-width:768px){.markmap-container{height:400px}}</style>`;
  data.content += css;
  return data;
});