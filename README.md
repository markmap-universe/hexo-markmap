[English](https://github.com/MaxChang3/hexo-markmap/blob/main/README_EN.md)
| 简体中文 |

依赖于 [markmap](https://github.com/gera2ld/markmap)，灵感来自 [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap)

> **⚠️更新 1.0.5 版本修复 `undefined` 错误**
>
> 前不久上游 markmap-view 进行了一次[大的版本更新](https://github.com/gera2ld/markmap/commit/963b0f47f78be88a06ff50bed97a7ce0597cf392)，由于我之前的代码中未锁定版本导致视图显示错误，目前已经在最新版本修复，建议立刻更新并清理 hexo 缓存以修复此问题。
>
> 后续将对根据新版本更新调整。

[![NPM](https://nodei.co/npm/hexo-markmap.png)](https://nodei.co/npm/hexo-markmap/)

# hexo-markmap
在你的博客中使用markdown插入思维导图，使用markmap。

现已经支持 链接、代码块、markdown 语法的渲染！
(Katex、多行代码暂不支持)

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
{% markmap height [depth] %}
```

## 参数
- `height`: 画布高度
- `depth`: 可选，自动折叠层数深于`depth`的节点

# 示例
```
{% markmap 300px %}
- Testa
  - test1
  - test2
- Testb
  - test1
  - test2
{%endmarkmap%}
```
