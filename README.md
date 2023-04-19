| [English](https://github.com/MaxChang3/hexo-markmap/blob/main/README.md)
| [简体中文](https://github.com/MaxChang3/hexo-markmap/blob/main/README_HANS.md)
| [繁体中文](https://github.com/MaxChang3/hexo-markmap/blob/main/README_HANT.md)
|

Depend on [markmap](https://github.com/gera2ld/markmap).

Inspired by [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap)

[![NPM](https://nodei.co/npm/hexo-markmap.png)](https://nodei.co/npm/hexo-markmap/)

# hexo-markmap
A hexo plugin insert mindmap in your hexo blog by markmap (new rebuild).

From now all the syntax like html codes, links, inline code, markdown  KaTeX, Codeblocks is possible to use.

> Codeblocks still have some problems which may throw some errors.
More preview in [my blog](https://zhangmaimai.com/2021/02/23/hexo-mindmap-plugin/).

# Install
```
pnpm add hexo-markmap
```

```
npm install hexo-markmap
```


```
yarn add hexo-markmap
```

# Usage
```
{% markmap height [depth] %}
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
- Katex - $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$
{% endmarkmap %}
````

## Config

add your optionss to config.yml

convention over configuration, if you don't need any following feature, then you needn't to add these configs.

By default, it works well. Each option has a default value.



### pjax fixing
default value `false`
```yaml
hexo_markmap:
  pjax: true
```
if your blog install pjax, please turn it on.

### KaTeX
default value `false`
```yaml
hexo_markmap:
  katex: true
```

if you need to use $K\kern-.25em\raise.45ex {\scriptstyle{A}}\kern-.15em\TeX$, please turn it on to insert the css links. or your $K\kern-.25em\raise.45ex {\scriptstyle{A}}\kern-.15em\TeX$ was already added in your blog by another way, then you needn't to do it.

> turn it on if you've installed `mathjax`
### Prism
default value `false`
```yaml
hexo_markmap:
  prism: true
```
if you need to inner code block,  please turn it on to insert the css links. or prism.css was already added in your blog by another way, then you needn't to do it.

### Custom CDN
```yaml
hexo_markmap:
  CDN:
    d3_js: https://fastly.jsdelivr.net/npm/d3@6
    markmap_view_js: https://fastly.jsdelivr.net/npm/markmap-view@0.2.7
    katex_css: https://fastly.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css
    prism_css: https://fastly.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css
```

### default option
```yaml
hexo_markmap:
  pjax: false
  katex: false
  prism: false
  CDN:
    d3_js: https://fastly.jsdelivr.net/npm/d3@6
    markmap_view_js: https://fastly.jsdelivr.net/npm/markmap-view@0.2.7
    katex_css: https://fastly.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css
    prism_css: https://fastly.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css
```
