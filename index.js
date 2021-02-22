'use strict';
const creator = require('./lib/creator');
const fs = require('hexo-fs');
const path = require('path');

hexo.extend.generator.register('markmap_asset', ()=>[
    {
      path: 'css/markmap.css',
      data: function(){
        return fs.createReadStream(
          path.resolve(path.resolve(__dirname, "./css/"),"markmap.css"));
      }
    }
]);

hexo.extend.tag.register("markmap", function (args, content) {
  var svg = creator(
    "\`\`\`mindmap\n" + content + "\n\`\`\`"
  );
  return `<div class="markmap-container" >`+ svg + `</div>`;
}, { ends: true });


hexo.extend.injector.register('body_end', () => {
  return `<script src="https://cdn.jsdelivr.net/npm/d3@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/markmap-lib@0.7.4/dist/browser/view.min.js"></script>
  <script>
      const mindmaps = document.querySelectorAll('.markmap-svg');
   
      for(const mindmap of mindmaps) {
          markmap.markmap(mindmap, JSON.parse(mindmap.innerHTML));
      }
  </script> `
}, 'post');

hexo.extend.filter.register('after_post_render', (data) => {
  let my_css = '<link rel="stylesheet" href="/css/markmap.css" type="text/css">';
  data.content += my_css;
  return data;
});