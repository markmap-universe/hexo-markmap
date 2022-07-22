const { Transformer } = require('markmap-lib')
const get = require('lodash.get')
const { mainTemplate, containerTemplate, afterRender } = require('./lib/template')
const { fold } = require('./lib/extension')
const { config } = hexo
const transformer = new Transformer()

hexo.extend.tag.register(
  'markmap',
  ([height, depth], markdown) => {
    const { root: svgData } = transformer.transform(markdown)
    return containerTemplate(fold(svgData, depth), { height })
  },
  { ends: true }
)
const fget = (path) => get(config, path, false)

hexo.extend.filter.register('after_render:html', (content) =>
  afterRender(content, mainTemplate({
    pjaxEnable:  fget("hexo_markmap.pjax") || fget("theme_config.pjax"),
    katexEnable: fget("hexo_markmap.katex"),
    prismEnable: fget("hexo_markmap.prism"),
  },
    fget("hexo_markmap.CDN")
  ))
)
