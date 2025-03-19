[**简体中文**](https://github.com/maxchang3/hexo-markmap/blob/2.0.0-beta/README.zh.md)

> Depend on [markmap](https://github.com/gera2ld/markmap). Inspired by [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap).

> [!WARNING]
> This is the documentation for `hexo-markmap@2`. If you are using `hexo-markmap@1`, please check [here](https://github.com/markmap-universe/hexo-markmap/tree/legacy).
>
> The configuration files of `hexo-markmap@2` are **incompatible** with `hexo-markmap@1`. And it has more strict type checking.

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

Just like you use Frontmatter in your Markdown files in Hexo, you can use Frontmatter in the `markmap` tag to customize your mindmap!

```yaml
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

```js
console.log('hello, JavaScript')
```

| Products | Price |
|-|-|
| Apple | 4 |
| Banana | 2 |

![](https://markmap.js.org/favicon.png)
{% endmarkmap %}
````

</details>

## Config

Add your options to `config.yml`.

Convention over configuration, if you don’t need any of the following features, then you don’t need to add these configs.

By default, it works well. Each option has a default value.

### Default options
```yaml
hexo_markmap:
  darkThemeCssSelector: '.dark'
  CDN: 'fastly'
```
- **`darkThemeCssSelector`** : Used to specify the CSS selector for the dark theme.  
- **`CDN`** : Used to specify the CDN for Markmap. The supported values are `fastly`, `jsdelivr`, and `unpkg`.

# Contributors

Thanks to all contributors🥰!

<a href="https://github.com/maxchang3/hexo-markmap/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=maxchang3/hexo-markmap" />
</a>

**Thanks to [@coderxi1](https://github.com/coderxi1/) for the conception and initial implementation of version 2!**
