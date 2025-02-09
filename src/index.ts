/// <reference types="hexo" />
import matter from 'gray-matter'
import { Transformer, type IMarkmapJSONOptions } from 'markmap-lib'
import { persistCSS, persistJS } from 'markmap-common'
import markmapInit from './markmap-init.js'
import markmapStyle from './markmap-style.js'

interface HexoMarkmapConfig {
    darkThemeCssSelector: string
}

const defaultConfig: HexoMarkmapConfig = {
    darkThemeCssSelector: '.dark',
}

const userConfig = {
    ...defaultConfig,
    ...hexo.config['hexo_markmap']
}

const assetsHTMLsMap: Record<string, Set<string> | undefined> = {}
const transformer = new Transformer()

// register tag
hexo.extend.tag.register('markmap', function (_args: string[], _content: string) {
    // params
    const { data: frontmatter, content } = matter(_content)
    const { id, style, jsonOptions } = Object.assign({ ...frontmatter }, {
        id: frontmatter['id'] ?? Date.now().toString(36) + Math.floor(Math.random() * 10000).toString(36),
        jsonOptions: frontmatter['options'] ?? {} as IMarkmapJSONOptions
    })
    // transform
    const { root, features } = transformer.transform(content)
    const { styles = [], scripts = [] } = transformer.getUsedAssets(features)
    const wrapHTML = `
    <div class="markmap-wrap" id="${id}">
      <script type="application/json">${JSON.stringify(root)}</script>
      <script type="application/json">${JSON.stringify(jsonOptions)}</script>
    </div>
  `
    const assetsHTMLs = [
        ...persistCSS([
            { type: 'style', data: template(style, { id }) },
            ...styles
        ]),
        ...persistJS(scripts, {
            getMarkmap: () => window.markmap,
            root,
        })
    ]
    // save assetsHTMLs
    // @ts-ignore
    const { slug } = this
    assetsHTMLsMap[slug] = new Set([...(assetsHTMLsMap[slug] ?? []), ...assetsHTMLs])
    // replace node
    return wrapHTML.trim()
}, { ends: true })

hexo.extend.filter.register('after_post_render', function (data: { content: string, slug: string }) {
    const { slug } = data
    const assetsHTMLsSet = assetsHTMLsMap[slug]
    const assetsHTMLsArray: string[] = []
    if (assetsHTMLsSet) {
        assetsHTMLsArray.push(
            `<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>`,
            `<script src="https://cdn.jsdelivr.net/npm/markmap-view"></script>`,
            `<script src="https://cdn.jsdelivr.net/npm/markmap-toolbar"></script>`,
            `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markmap-toolbar/dist/style.css"></link>`,
            ...assetsHTMLsSet,
            `<style>${markmapStyle(userConfig.darkThemeCssSelector)}</style>`,
            `<script>
                const hexoMarkmap = (${markmapInit.toString()})();
                hexoMarkmap.init();
            </script>`
        )
    }
    data.content += assetsHTMLsArray.join('')
})

function template(template: string, props?: {}) {
    return !props
        ? template
        : new Function(...Object.keys(props), `return \`${template}\`;`)(...Object.values(props))
}

