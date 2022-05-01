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

From now the render of html codes, links, inline code, markdown is possible to use. ( Katex, Codeblocks not yet)

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

# Example 
```
{% markmap 300px %}
# Testa
## test1
## test2
# Testb
## test1
## test2
{%endmarkmap%}
```
