[English](https://github.com/MaxChang3/hexo-markmap/blob/main/README_EN.md)
| 简体中文 |

依赖于 [markmap](https://github.com/gera2ld/markmap)，灵感来自 [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap)

> 1.0版本全新发布，重构了大部分代码（其实本来也没多少），并且去除了markdown-it&markdown-it-markmap。欢迎大家更新

[![NPM](https://nodei.co/npm/hexo-markmap.png)](https://nodei.co/npm/hexo-markmap/)

# hexo-markmap
在你的博客中使用markdown插入思维导图，使用markmap。

由于转义符号在markmap渲染中的操作，对于Katex、链接、代码块的暂时仍未支持（在旧版本中使用markdown-it-markmap也存在），希望有人可以帮我改进他。

因为新版本中引入了最新的markmap，并且目前因为上述原因屏蔽掉了插件中的Katex，所以
这为未来对上述问题的支持提供了可能性，尽管我还做不到。

更多预览和说明见 [我的博客](https://zhangmaimai.com/2021/02/23/hexo-mindmap-plugin/).
# 安装
```
npm install hexo-markmap
```
或
```
yarn add hexo-markmap
```

# 使用
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
