| [English](https://github.com/MaxChang3/hexo-markmap/blob/main/README.md)
| [簡體中文](https://github.com/MaxChang3/hexo-markmap/blob/main/README_HANS.md)
| [繁體中文](https://github.com/MaxChang3/hexo-markmap/blob/main/README_HANT.md)
|

依賴於 [markmap](https://github.com/gera2ld/markmap)，靈感來自 [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap)。

# hexo-markmap  <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/v/hexo-markmap"></a> <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/dm/hexo-markmap"></a>

在你的部落格中使用 markdown 插入思維導圖，使用 markmap。

現已經支援 連結、程式碼塊、markdown、KaTeX、多行程式碼語法的渲染！

> 多行程式碼仍有一定渲染問題，可能出現報錯。

更多預覽和說明見 [我的部落格](https://zhangmaimai.com/2021/02/23/hexo-mindmap-plugin/).

# 安裝

```
pnpm add hexo-markmap -D
```

```
npm install hexo-markmap  --save
```

```
yarn add hexo-markmap -D
```

# 使用

```
{% markmap height [depth] %}
- Markdown
- Syntax
{% endmarkmap %}
```

## 引數

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
- KaTeX - $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$
{% endmarkmap %}
````

## 配置檔案

將相應內容追加到 config.yml 中。

約定大於配置，如果你不需要以下某個功能，那麼無需新增該配置項。 

預設情況下，他可以很好的正常工作。每個選項都有預設項。

### pjax 修復

預設值 `false`

```yaml
hexo_markmap:
  pjax: true
```
如果你的部落格安裝了 pjax 請開啟此項配置。

### KaTeX
預設值 `false`
```yaml
hexo_markmap:
  katex: true
```

如果你需要使用 $K\kern-.25em\raise.45ex {\scriptstyle{A}}\kern-.15em\TeX$ 請開啟此項配置以插入 CSS 檔案。如果部落格本身已經透過其他方式配置 $K\kern-.25em\raise.45ex {\scriptstyle{A}}\kern-.15em\TeX$ 則無需開啟.

> 如果你同時裝有 `mathjax`，也請開啟此項。

### Prism

預設值 `false`
```yaml
hexo_markmap:
  prism: true
```

如果需要插入程式碼塊，請開啟此項配置以插入 CSS 檔案。如果部落格本身已經透過其他方式配置 prism 則無需開啟.

### 自定義 CDN

```yaml
hexo_markmap:
  CDN:
    d3_js: https://fastly.jsdelivr.net/npm/d3@6
    markmap_view_js: https://fastly.jsdelivr.net/npm/markmap-view@0.2.7
    katex_css: https://fastly.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css
    prism_css: https://fastly.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css
```

### 預設項

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
