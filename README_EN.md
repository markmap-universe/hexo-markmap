English
| [简体中文](https://github.com/MaxChang3/hexo-markmap/blob/main/README.md) |

Depend on [markmap](https://github.com/gera2ld/markmap).

Inspired by [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap)

> **⚠️Update version 1.0.5 to fix `undefined` bug**
>
> Our upstream package markmap-view released a new version, which makes the view show undefined, 'cause without locking its version in our code. This bug has been fixed in the latest version, We recommend updating it on time and cleaning the cache of hexo to fix it.
>
> Update according to the new version will be made in the future

[![NPM](https://nodei.co/npm/hexo-markmap.png)](https://nodei.co/npm/hexo-markmap/)

# hexo-markmap
A hexo plugin insert mindmap in your hexo blog by markmap (new rebuild).

From now all the syntax like html codes, links, inline code, markdown  KaTeX, Codeblocks is possible to use.

> Codeblocks still have some problems which may throw some errors.

More preview in [my blog](https://zhangmaimai.com/2021/02/23/hexo-mindmap-plugin/).

# Install
```
npm install hexo-markmap
```
or
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

config.yml

### pjax fixing
```yaml
hexo_markmap:
  pjax: true
```
if your blog install pjax, please turn it on.

### KaTeX
```yaml
hexo_markmap:
  katex: true
```

if you need to use $K\kern-.25em\raise.45ex {\scriptstyle{A}}\kern-.15em\TeX$, please turn it on to insert the css links. or your $K\kern-.25em\raise.45ex {\scriptstyle{A}}\kern-.15em\TeX$ was already added in your blog by another way, then you needn't to do it.

> turn it on if you've installed `mathjax`
