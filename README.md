[**简体中文**](https://github.com/maxchang3/hexo-markmap/blob/2.0.0-beta/README.zh.md)

> [!WARNING]
> This is the documentation for `hexo-markmap@2`. If you use `hexo-markmap@1`, please check [here](https://github.com/markmap-universe/hexo-markmap/tree/legacy)
> 
> If you want to upgrade to `hexo-markmap@2`, please check [here](#upgrade-to-hexo-markmap-v2).

<img src="https://raw.githubusercontent.com/markmap-universe/logo/master/hexo-markmap-logo.png" alt="Hexo logo" width="100" height="100" align="right" />

# hexo-markmap <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/v/hexo-markmap"></a> <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/dm/hexo-markmap"></a>

Insert a mindmap into your Hexo blog using [markmap](https://markmap.js.org/).

## Install

```
pnpm add hexo-markmap -D
```

```
npm install hexo-markmap --save-dev
```


```
yarn add hexo-markmap --dev
```


> [!TIP]
> Try our new VS Code extension, [markmap-universe](https://marketplace.visualstudio.com/items?itemName=maxchang.vscode-markmap-universe), to directly preview your `hexo-markmap` mindmaps.

## Usage

```markdown
{% markmap %}
---
options:
  colorFreezeLevel: 2
---
# Markdown
# Syntax
{% endmarkmap %}
```

### Inline Options

You can customize each mindmap individually in the `markmap` tag.

#### Frontmatter Options

Just like you use frontmatter in your Markdown files in Hexo, you can use frontmatter in the `markmap` tag to customize your mindmap!

All frontmatter options are optional.

- **`id`** : Used to define the ID of the `markmap-wrap` element.  

- **`markmap`** : Correspond to the [`IMarkmapJSONOptions`](https://markmap.js.org/api/interfaces/markmap-view.IMarkmapJSONOptions.html) in the markmap project. For more details, please refer to [`jsonOptions`](https://markmap.js.org/docs/json-options#option-list).
  - alias: **`options`** (for backward compatibility)


<details>

<summary>Difference between <code>markmap</code> and <code>options</code></summary>

- **`markmap` (from markmap-lib)** 
  Will be [preprocessed](https://github.com/markmap/markmap/blob/master/packages/markmap-lib/src/plugins/frontmatter/index.ts#L41) (converting strings to arrays or numbers) and overrides the legacy `options`.
  - E.g., `color: 'red'` will be converted to `color: ['red']`, only the latter is valid in `markmap-view`.
  - ✅ Recommended for consistent use with `markmap`.

- **`options` (from markmap-universe)** Passed directly to markmap-view.  
  - ❌ Not recommended, maintained only for backward compatibility.

</details>


#### Tag Options

You can also specify the height of the mindmap directly in the tag. By default, it will be calculated based on the content.

```markdown
{% markmap 300px %}
# Markdown
# Syntax
{% endmarkmap %}
```

### Config

Add your options to `config.yml`.

Convention over configuration, if you don't need any of the following features, then you don't need to add these configs.

By default, it works well. Each option has a default value.

#### Default options

```yaml
hexo_markmap:
  darkThemeCssSelector: '.dark'
  CDN: 'fastly' 
  customCDN: 'https://fastly.jsdelivr.net/npm/'
```

- **`darkThemeCssSelector`** : Used to specify the CSS selector for the dark theme.  
- **`CDN`** : Used to specify the CDN for Markmap. The supported values are `fastly`, `jsdelivr`, `unpkg`, and `custom`.
  - If set to `custom`, the `customCDN` value will be used as the CDN prefix.
- **`customCDN`** : Defines a custom CDN URL for Markmap. This must be a valid URL.
- **`globalOptions`** : Used to define global options for all mindmaps.    
  - Correspond to the [`options`](#frontmatter-options) in the frontmatter.

## Upgrade to `hexo-markmap` v2

`hexo-markmap@2` is a completely refactored version by [@coderxi1](https://github.com/coderxi1/) and [@maxchang3](https://github.com/maxchang3/). This version upgrades to the latest Markmap and introduces more customization options, including:

- Customization within a single Markmap tag using frontmatter:
  - CSS styles (custom height, width, responsive layout, etc.)
    - Since v2.0.5, setting styles in the frontmatter is no longer supported. Instead, you can define them directly within a `<style>` tag by combining it with the `id` option.
  - Markmap's [JSON Options](https://markmap.js.org/docs/json-options#option-list)
- Automatic CDN URL generation using Markmap's built-in URL builder
- On-demand CDN resource insertion based on syntax usage
- Support for dark mode and fullscreen button
- Refactored in TypeScript with test coverage

Note that some implementation details differ from `hexo-markmap@1`. If you do not require these new features, you may continue using `hexo-markmap@1`.

To upgrade to `hexo-markmap@2`, follow these steps:

1. Install `hexo-markmap@2` using your preferred package manager:

    ```bash
    pnpm add hexo-markmap@2 -D
    ```
    ```bash
    npm install hexo-markmap@2 --save-dev
    ```
    ```bash
    yarn add hexo-markmap@2 -D
    ```

2. Modify your `config.yml` as needed:

   - The following configuration options are **no longer supported**:
      ```diff
      hexo_markmap:
      -  pjax: false
      -  katex: false
      -  prism: false
      -  lockView: false
      -  fixSVGAttrNaN: false
      ```
      - The new version no longer supports `pjax` compatibility;
      - KaTeX and Prism.js are now automatically detected and generate corresponding CDN tags;
      - You can disable `pan` and `zoom` in the frontmatter `options` to achieve the `lockView` effect.

   - `CDN` configuration logic has also changed:
      ```diff
      hexo_markmap:
      -  userCDN:
      -    d3_js: https://fastly.jsdelivr.net/npm/d3@6
      -    markmap_view_js: https://fastly.jsdelivr.net/npm/markmap-view@0.2.7
      -    katex_css: https://fastly.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css
      -    prism_css: https://fastly.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css
      +  CDN: 'custom'
      +  customCDN: 'https://fastly.jsdelivr.net/npm/'
      ```
      - The new `CDN` setting supports `fastly`, `jsdelivr`, `unpkg`, and a `custom` option;
      - If you choose `custom`, the `customCDN` value will be used as the CDN prefix.

   - Additionally, the previous `depth` parameter for setting fold levels has been removed. Instead, you can use the `initialExpandLevel` option in frontmatter.
3. Update your `markmap` tags in your Markdown files:

   - The `markmap` tag now supports frontmatter options. You can specify the options directly in the tag, like this:
      ```markdown
      {% markmap %}
      ---
      markmap:
        colorFreezeLevel: 2
      ---
      # Markdown
      # Syntax
      {% endmarkmap %}
      ```

   - You can still customize the height of the mindmap directly in the tag, by default it will be calculated based on the content:
      ```diff
      - {% markmap 300px %}
      + {% markmap %}
      # Markdown
      # Syntax
      {% endmarkmap %}
      ```
4. Finally, regenerate your blog.


## Example 

<details>

````markdown
{% markmap %}
---
markmap:
  colorFreezeLevel: 2
---

## Links

- [Website](https://markmap.js.org/)
- [GitHub](https://github.com/gera2ld/markmap)

## Related Projects

- [coc-markmap](https://github.com/gera2ld/coc-markmap) for Neovim
- [markmap-vscode](https://marketplace.visualstudio.com/items?itemName=gera2ld.markmap-vscode) for VSCode
- [eaf-markmap](https://github.com/emacs-eaf/eaf-markmap) for Emacs

## Features

Note that if blocks and lists appear at the same level, the lists will be ignored.

### Lists

- **strong** ~~del~~ *italic* ==highlight==
- `inline code`
- [x] checkbox
- Katex: $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$ <!-- markmap: fold -->
  - [More Katex Examples](#?d=gist:af76a4c245b302206b16aec503dbe07b:katex.md)
- Now we can wrap very very very very long text based on `maxWidth` option
- Ordered list
  1. item 1
  2. item 2

### Blocks
<!-- To avoid hexo treat the following as code block, we need to use a list -->
- ```js 
  console.log('hello, JavaScript')
  ```

- | Products | Price |
  |-|-|
  | Apple | 4 |
  | Banana | 2 |

- ![](https://markmap.js.org/favicon.png)
{% endmarkmap %}
````

</details>

## Contributors

Thanks to all contributors🥰!

<a href="https://github.com/maxchang3/hexo-markmap/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=maxchang3/hexo-markmap" />
</a>

## Credits

- This project would not have been possible without [markmap](https://markmap.js.org/).
- Originally inspired by [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap).
- Thanks to [@coderxi1](https://github.com/coderxi1/) for conceiving and implementing the initial version 2!
