const { Transformer } = require('markmap-lib')
const {
  mainTemplate,
  containerTemplate,
  afterRender
} = require('./lib/template')
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

hexo.extend.filter.register('after_render:html', (content) =>
  // 可选操作符不支持 nodejs 14 以下，改成通用
  afterRender(
    content,
    mainTemplate(
      {
        katexEnable:
          config && config.hexo_markmap && config.hexo_markmap.katex
            ? true
            : false,
        prismEnable:
          config && config.hexo_markmap && config.hexo_markmap.prism
            ? true
            : false
      }
      // 使用着不应知道要用哪些包，而应给他们选择需要什么功能
      // config?.hexo_markmap?.CDN
    )
  )
)
