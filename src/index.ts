/// <reference types="hexo" />
import type { PostSchema } from 'hexo/dist/types.d.ts'

import matter from 'gray-matter'
import { Transformer } from 'markmap-lib'
import { persistCSS, persistJS } from 'markmap-common'
import markmapInit from './markmap-init.js'
import markmapStyle from './markmap-style.js'
import { parseFrontmatter, template } from './utils.js'

interface HexoMarkmapConfig {
    darkThemeCssSelector: string
}

const defaultConfig: HexoMarkmapConfig = {
    darkThemeCssSelector: '.dark',
}

const userConfig: HexoMarkmapConfig = {
    ...defaultConfig,
    ...hexo.config['hexo_markmap']
}

const assetsHTMLsMap: Record<string, Set<string> | undefined> = {}
const transformer = new Transformer()

/**
 * Register a tag for Hexo to render Markmap.
 */
hexo.extend.tag.register('markmap', function (this: PostSchema, _args: string[], _content: string) {
    // parse frontmatter
    const { data: rawFrontmatter, content } = matter(_content)
    const frontmatter = parseFrontmatter(rawFrontmatter)
    const { id, style, options: jsonOptions } = frontmatter
    // transform content
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
    const { slug } = this
    if (slug) assetsHTMLsMap[slug] = new Set([...(assetsHTMLsMap[slug] ?? []), ...assetsHTMLs])
    return wrapHTML.trim()
}, { ends: true })

/**
 * Inject Markmap assets into the post.
 */
hexo.extend.filter.register('after_post_render', function (this: PostSchema, data: { content: string, slug: string }) {
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
