/// <reference types="hexo" />
import type { PostSchema } from 'hexo/dist/types.d.ts'
import matter from 'gray-matter'
import { persistCSS, persistJS } from 'markmap-common'
import { markmapInit, markmapStyle } from '@/template'
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

const js = hexo.extend.helper.get("js").bind(hexo)
const css = hexo.extend.helper.get("css").bind(hexo)

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
 * Generate Markmap assets.
 */
hexo.extend.generator.register('markmap_asset', () => [{
    path: 'js/markmap.js',
    data: () => markmapInit(),
}, {
    path: 'css/markmap.css',
    data: () => markmapStyle(userConfig.darkThemeCssSelector)
}])

/**
 * Inject Markmap assets into the post.
 */
hexo.extend.filter.register('after_post_render', function (this: PostSchema, data: { content: string, slug: string }) {
    const { slug } = data

    const pageAssets = assetsHTMLMap.get(slug) ?? []

    const VIEW_VERSION = process.env.VIEW_VERSION
    const TOOLBAR_VERSION = process.env.TOOLBAR_VERSION

    const basePackages = [
        'd3@7',
        `markmap-view@${VIEW_VERSION}`,
        `markmap-toolbar@${TOOLBAR_VERSION}`,
    ]

    const basePackageScripts = basePackages.map(name =>
        `<script src="${urlBuilder.getFullUrl(name)}"></script>`
    )

    const basePackageStyles = [
        urlBuilder.getFullUrl(
            `markmap-toolbar@${TOOLBAR_VERSION}/dist/style.css`
        ),
    ].map(path => `<link rel="stylesheet" href="${path}">`)

    const combinedAssetHTML: string[] = [
        ...basePackageStyles,
        ...basePackageScripts,
        ...pageAssets,
        css('/css/markmap.css'),
        js('/js/markmap.js'),
        
    ]
    data.content += combinedAssetHTML.join('')
})
