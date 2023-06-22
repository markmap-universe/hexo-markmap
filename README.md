| [English](https://github.com/MaxChang3/hexo-markmap/blob/main/README.md)
| [简体中文](https://github.com/MaxChang3/hexo-markmap/blob/main/README_HANS.md)
| [繁体中文](https://github.com/MaxChang3/hexo-markmap/blob/main/README_HANT.md)
|

Depend on [markmap](https://github.com/gera2ld/markmap). Inspired by [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap).

# hexo-markmap <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/v/hexo-markmap"></a> <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/dm/hexo-markmap"></a>

Insert mindmap in your hexo blog by markmap.

From now all the syntax like HTML codes, links, inline code, markdown KaTeX, and Codeblocks are possible to use.

> Codeblocks still have some problems which may throw some errors.
More preview in [my blog](https://zhangmaimai.com/2021/02/23/hexo-mindmap-plugin/).

# Install

```
pnpm add hexo-markmap -D
```

```
npm install hexo-markmap  --save
```


```
yarn add hexo-markmap --dev
```

# Usage

```
{% markmap height [depth] %}
- Markdown
- Syntax
{% endmarkmap %}
```

## Options

- `height`: mindmap canvas height
- `depth`: optional, when specified, automatically fold nodes with level greater than `depth`

## Example 

````
{% markmap 400px %}
- links
- **inline** ~~text~~ *styles*
- multiline
  text
- `inline code`
- ```js
  console.log('code block');
  console.log('code block');
  ```
- KaTeX - $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$
{% endmarkmap %}
````

## Config

Add your options to config.yml.

Convention over configuration, if you don’t need any of the following features, then you don’t need to add these configs.

By default, it works well. Each option has a default value.


### pjax fixing

default value `false`

```yaml
hexo_markmap:
  pjax: true
```

If your blog has pjax installed, please turn it on.

### KaTeX

default value `false`

```yaml
hexo_markmap:
  katex: true
```

If you need to use $K\kern-.25em\raise.45ex {\scriptstyle{A}}\kern-.15em\TeX$, please turn it on to insert the CSS links. If your $K\kern-.25em\raise.45ex {\scriptstyle{A}}\kern-.15em\TeX$ was already added in your blog by another way, then you needn't to do it.

> If your blog has MathJax installed, please turn it on.


### Prism

default value `false`

```yaml
hexo_markmap:
  prism: true
```

If you need to use code blocks, please turn it on to insert the CSS links. If prism.css has already been added to your blog by another way, then you don’t need to do it.

### Custom CDN

```yaml
hexo_markmap:
  userCDN:
    d3_js: https://fastly.jsdelivr.net/npm/d3@6
    markmap_view_js: https://fastly.jsdelivr.net/npm/markmap-view@0.2.7
    katex_css: https://fastly.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css
    prism_css: https://fastly.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css
```

### Lock view

default value `false`

Disable the zoom and pan of the view.

```yaml
hexo_markmap:
  lockView: true
```

### Fix SVG attribute errors caused by unknown reasons

Default value `false`

Due to unknown reasons, in some hexo themes (such as [hexo-theme-volantis](https://github.com/volantis-x/hexo-theme-volantis/)), during the process of loading the page, markmap will report an error `Error: <g> attribute transform: Expected number, "translate(NaN,NaN) scale(N…".`.

This is because the zoom event of d3.js returns x, y, k attributes with `NaN` values. As this is an upstream issue and the reason is currently unknown, this problem is fixed by a rather dirty patch method. This problem will not affect normal use whether it is turned on or off.

### default option
```yaml
hexo_markmap:
  pjax: false
  katex: false
  prism: false
  userCDN:
    d3_js: https://fastly.jsdelivr.net/npm/d3@6
    markmap_view_js: https://fastly.jsdelivr.net/npm/markmap-view@0.2.7
    katex_css: https://fastly.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css
    prism_css: https://fastly.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css
  lockView: false
  fixSVGAttrNaN: false
```
