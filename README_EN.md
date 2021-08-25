English
| [简体中文](https://github.com/MaxChang3/hexo-markmap/blob/main/README.md) |

Depend on [markmap](https://github.com/gera2ld/markmap).

Inspired by [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap)

> 1.0 new version is published. I rebuild most of the code(though it's also not so much before-), also I remove arkdown-it&markdown-it-markmap. highly recommend to update it.

[![NPM](https://nodei.co/npm/hexo-markmap.png)](https://nodei.co/npm/hexo-markmap/)

# hexo-markmap
A hexo plugin insert mindmap in your hexo blog by markmap (new rebuild).

Due to the escape system in markmap render  of the html codes, Katex links code block are not support yet, which is a same problem in the older version that use markdown-it-markmap, hope someone can help me improve it

Altough the latest markmap is required in the new version, Katex plugin in  markmap is blocked for the above reasons.
But this provides the possibility for future support for the above issues, although I can't do it yet.

More preview in [my blog](https://zhangmaimai.com/2021/02/23/hexo-mindmap-plugin/).

# Install
```
npm install hexo-markmap
```
或
```
yarn add hexo-markmap
```

# Usage 
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
