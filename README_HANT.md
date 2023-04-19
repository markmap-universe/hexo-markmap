| [English](https://github.com/MaxChang3/hexo-markmap/blob/main/README.md)
| [簡體中文](https://github.com/MaxChang3/hexo-markmap/blob/main/README_HANS.md)
| [繁體中文](https://github.com/MaxChang3/hexo-markmap/blob/main/README_HANT.md)
|

依賴於 [markmap](https://github.com/gera2ld/markmap)，靈感來自 [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap)

[![NPM](https://nodei.co/npm/hexo-markmap.png)](https://nodei.co/npm/hexo-markmap/)

# hexo-markmap
在你的博客中使用 markdown 插入思維導圖，使用 markmap。

現已經支持 鏈接、代碼塊、markdown、Katex、多行代碼語法的渲染！

> 多行代碼仍有一定渲染問題，可能出現報錯。

更多預覽和說明見 [我的博客](https://zhangmaimai.com/2021/02/23/hexo-mindmap-plugin/).
# 安裝
```
pnpm add hexo-markmap
```

```
npm install hexo-markmap
```

```
yarn add hexo-markmap
```

# 使用
```
{% markmap height [depth] %}
```

## 參數
- `height`: 畫布高度
- `depth`: 可選，自動摺疊層數深於 `depth` 的節點

## 示例
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

## 配置文件

將相應內容追加到 config.yml 中。

約定大於配置，如果你不需要以下某個功能，那麼無需添加該配置項。 

默認情況下，他可以很好的正常工作。每個選項都有缺省項。

### pjax 修復
默認值 `false`
```yaml
hexo_markmap:
  pjax: true
```
如果你的博客安裝了 pjax 請開啓此項配置。

### KaTeX
默認值 `false`
```yaml
hexo_markmap:
  katex: true
```

如果你需要使用 $K\kern-.25em\raise.45ex {\scriptstyle{A}}\kern-.15em\TeX$ 請開啓此項配置以插入 css 文件。如果博客本身已經通過其他方式配置 $K\kern-.25em\raise.45ex {\scriptstyle{A}}\kern-.15em\TeX$ 則無需開啓.

> 如果你同時裝有 `mathjax`，也請打開此項。
### Prism
默認值 `false`
```yaml
hexo_markmap:
  prism: true
```

如果需要插入代碼塊，請開啓此項配置以插入 css 文件。如果博客本身已經通過其他方式配置 prism 則無需開啓.

### 自定義 CDN
```yaml
hexo_markmap:
  CDN:
    d3_js: https://fastly.jsdelivr.net/npm/d3@6
    markmap_view_js: https://fastly.jsdelivr.net/npm/markmap-view@0.2.7
    katex_css: https://fastly.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css
    prism_css: https://fastly.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css
```

### 缺省項
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
