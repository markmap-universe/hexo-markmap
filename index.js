const { Transformer } = require('markmap-lib')
const get = require('lodash.get')
const { mainTemplate, containerTemplate, afterRender, scriptTemplate } = require('./lib/template')
const { fold } = require('./lib/extension')

const { config } = hexo
const transformer = new Transformer()
const options = {
  pjaxEnable: fget("hexo_markmap.pjax") || fget("theme_config.pjax"),
  katexEnable: fget("hexo_markmap.katex"),
  prismEnable: fget("hexo_markmap.prism"),
  userCDN: fget("hexo_markmap.userCDN")
}
const fget = (path) => get(config, path, false)

hexo.extend.tag.register('markmap', ([height, depth], markdown) => {
  const { root: svgData } = transformer.transform(markdown)
  return containerTemplate(fold(svgData, depth), { height })
},
  { ends: true }
)

hexo.extend.generator.register('markmap_asset', () => [{
  path: 'js/markmap.js',
  data: () => mainTemplate(options)
}]
)

hexo.extend.filter.register('after_render:html', (content) =>
  afterRender(content, scriptTemplate(), {
    pjaxEnable: options.pjaxEnable,
  })
)
