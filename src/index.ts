/// <reference types="hexo" />
import type { PostSchema } from 'hexo/dist/types.d.ts'

import matter from 'gray-matter'
import { persistCSS, persistJS } from 'markmap-common'
import markmapInit from '@/markmap-init'
import markmapStyle from '@/markmap-style'
import { parseFrontmatter, template, ExtendedMap, getTransformer } from '@/utils'

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

const assetsHTMLMap: ExtendedMap<string, Set<string>> = new ExtendedMap()
const transformer = getTransformer()
const { urlBuilder } = transformer

/**
 * Register a tag for Hexo to render Markmap.
 */
hexo.extend.tag.register('markmap', function (this: PostSchema, _args: string[], _content: string) {
    // parse frontmatter
    const { data: rawFrontmatter, content } = matter(_content)
    const frontmatter = parseFrontmatter(rawFrontmatter, content)
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
    const assetsHTML = [
        ...persistCSS([
            { type: 'style', data: template(style, { id }) },
            ...styles
        ]),
        ...persistJS(scripts, {
            getMarkmap: () => window.markmap,
            root,
        })
    ]
    // save assetsHTML
    const { slug } = this
    slug && assetsHTMLMap.entry(slug)
        .and(set => assetsHTML.forEach(set.add, set))
        .or_insert(() => new Set(assetsHTML))
    return wrapHTML.trim()
}, { ends: true })

/**
 * Inject Markmap assets into the post.
 */
hexo.extend.filter.register('after_post_render', function (this: PostSchema, data: { content: string, slug: string }) {
    const { slug } = data
    const assetsHTMLSet = assetsHTMLMap.get(slug) ?? []
    const basePackages = [
        'd3@7',
        'markmap-view',
        'markmap-toolbar',
        `markmap-toolbar/dist/style.css`
    ]
    const basePackagesHTML = basePackages.map(name =>
        `<script src="${urlBuilder.getFullUrl(name)}"></script>`
    )
    const assetsHTMLArray: string[] = [
        ...basePackagesHTML,
        ...assetsHTMLSet,
        `<style>${markmapStyle(userConfig.darkThemeCssSelector)}</style>`,
        `<script>
            const hexoMarkmap = (${markmapInit.toString()})();
            hexoMarkmap.init();
        </script>`
    ]
    data.content += assetsHTMLArray.join('')
})
