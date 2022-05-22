const { Transformer } = require('markmap-lib');
const { mainTemplate, containerTemplate, afterRender } = require("./lib/template");
const { fold } = require("./lib/extension");
const { config } = hexo
const transformer = new Transformer();

hexo.extend.tag.register("markmap", ([height, depth], markdown) => {
  const { root: svgData } = transformer.transform(markdown);
  return containerTemplate(fold(svgData, depth), { height })
}, { ends: true });

hexo.extend.filter.register('after_render:html', (content) =>
  afterRender(content, mainTemplate({
    pjaxEnable: config?.hexo_markmap?.pjax || config?.theme_config?.pjax,
    katexEnable: config?.hexo_markmap?.katex
  }))
)
