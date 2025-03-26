[**简体中文**](https://github.com/maxchang3/hexo-markmap/blob/2.0.0-beta/README.zh.md)

> Depend on [markmap](https://github.com/gera2ld/markmap). Inspired by [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap).

> [!WARNING]
> This is the documentation for `hexo-markmap@2`. If you are using `hexo-markmap@1`, please check [here](https://github.com/markmap-universe/hexo-markmap/tree/legacy).
>
> The configuration files of `hexo-markmap@2` are **incompatible** with `hexo-markmap@1`.
>
> If you want to upgrade to `hexo-markmap@2`, please check [here](#upgrade-to-hexo-markmap-v2).

<img src="https://raw.githubusercontent.com/markmap-universe/logo/master/hexo-markmap-logo.png" alt="Hexo logo" width="100" height="100" align="right" />

# hexo-markmap <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/v/hexo-markmap"></a> <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/dm/hexo-markmap"></a>

Insert mindmap in your hexo blog by Markmap.

# Install

```
pnpm add hexo-markmap -D
```

```
npm install hexo-markmap --save-dev
```


```
yarn add hexo-markmap --dev
```

# Usage

```markdown
{% markmap %}
---
style: |
  #${id} {
    height: 300px; /* Equivalent to {% markmap 300px %} */
  }
options:
  colorFreezeLevel: 2
---
# Markdown
# Syntax
{% endmarkmap %}
```

## Options

### Frontmatter Options

Just like you use frontmatter in your Markdown files in Hexo, you can use frontmatter in the `markmap` tag to customize your mindmap!

```yaml
# Optional, if not set, a random ID will be generated
id: markmap-example
style: |
  #${id} {
    height: 300px;
    width: 100%;
  }
  @media (min-width: 1280px) {
    #${id} {
      height: 600px;
    }
  }
options:
  colorFreezeLevel: 2
```
  
- **`style`** : Used to define custom CSS styles for the mindmap.
  The `${id}` placeholder can be used in the style field. During rendering, it will be replaced with the actual ID of the `markmap-wrap`, ensuring each mindmap element on the page has unique styles and behaviors.
  
- **`options`** : Correspond to the [`IMarkmapJSONOptions`](https://markmap.js.org/api/interfaces/markmap-view.IMarkmapJSONOptions.html) in the markmap project. For more details, please refer to [`jsonOptions`](https://markmap.js.org/docs/json-options#option-list).


### Tag Options

You can also specify the height of the mindmap directly in the tag.

```markdown
{% markmap 300px %}
# Markdown
# Syntax
{% endmarkmap %}
```

## Example 

<details>

````markdown
{% markmap %}
---
id: markmap-example
style: |
  #${id} {
    height: 300px;
    width: 100%;
  }
  @media (min-width: 1280px) {
    #${id} {
      height: 600px;
    }
  }
options:
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

## Config

Add your options to `config.yml`.

Convention over configuration, if you don't need any of the following features, then you don't need to add these configs.

By default, it works well. Each option has a default value.

### Default options

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

# Upgrade to `hexo-markmap` v2

`hexo-markmap@2` is a completely refactored version by [@coderxi1](https://github.com/coderxi1/) and [@maxchang3](https://github.com/maxchang3/). This version upgrades to the latest Markmap and introduces more customization options, including:

- Customization within a single Markmap tag using frontmatter:
  - CSS styles (custom height, width, responsive layout, etc.)
  - Markmap's [JSON Options](https://markmap.js.org/docs/json-options#option-list)
- Automatic CDN URL generation using Markmap’s built-in URL Builder
- Automatic generation of corresponding CDN tags based on syntax
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

3. Finally, regenerate your blog.


# Contributors

Thanks to all contributors🥰!

<a href="https://github.com/maxchang3/hexo-markmap/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=maxchang3/hexo-markmap" />
</a>

**Thanks to [@coderxi1](https://github.com/coderxi1/) for the conception and initial implementation of version 2!**
