Depend on [markmap](https://github.com/gera2ld/markmap).

Inspired by [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap)

> 1.0版本全新发布，重构了大部分代码（其实本来也没多少），并且去除了markdown-it&markdown-it-markmap。欢迎大家更新
> 1.0 new version is published. I rebuild most of the code(though it's also not so much before-), highly recommend to update it.

[![NPM](https://nodei.co/npm/hexo-markmap.png)](https://nodei.co/npm/hexo-markmap/)

# hexo-markmap
A hexo plugin insert mindmap in your hexo blog by markmap (new rebuild).

在你的博客中使用markdown插入思维导图，使用markmap。

More preview in [my blog](https://zhangmaimai.com/2021/02/23/hexo-mindmap-plugin/).

更多预览和说明见 [我的博客](https://zhangmaimai.com/2021/02/23/hexo-mindmap-plugin/).
# Install 安装
```
npm install hexo-markmap
```

# Usage 使用
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