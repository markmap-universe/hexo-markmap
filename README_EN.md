English
| [简体中文](https://github.com/MaxChang3/hexo-markmap/blob/main/README.md) |

Depend on [markmap](https://github.com/gera2ld/markmap).

Inspired by [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap)

> 1.0 new version is published. I rebuild most of the code(though it's also not so much before-), also I remove arkdown-it&markdown-it-markmap. highly recommend to update it.

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
