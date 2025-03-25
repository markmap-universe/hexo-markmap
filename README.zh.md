[**English**](https://github.com/maxchang3/hexo-markmap/blob/2.0.0-beta/README.md)

> 依赖于 [markmap](https://github.com/gera2ld/markmap)，灵感来自 [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap)。

> [!WARNING]
> 这是 `hexo-markmap@2` 的文档。如果你正在使用 `hexo-markmap@1`，请查看 [这里](https://github.com/markmap-universe/hexo-markmap/tree/legacy)。
>
> 目前 `hexo-markmap@2` 对 `hexo-markmap@1` 的配置文件**不兼容**。
>
> 如果你想升级到 `hexo-markmap@2`，请查看 [这里](#升级到-hexo-markmap-v2)。

# hexo-markmap  <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/v/hexo-markmap"></a> <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/dm/hexo-markmap"></a>

使用 Markmap 在你的博客中使用 Markdown 插入思维导图。

# 安装

```
pnpm add hexo-markmap -D
```

```
npm install hexo-markmap --save-dev
```

```
yarn add hexo-markmap -D
```

# 使用

```markdown
{% markmap %}
---
style: |
  #${id} {
    height: 300px; /* 等价于 {% markmap 300px %} */
  }
options:
  colorFreezeLevel: 2
---
# Markdown
# Syntax
{% endmarkmap %}
```

## 选项

### Frontmatter 选项

就像你在 Hexo 中的 Markdown 文件中使用 frontmatter 一样，你可以在 `markmap` 标签中使用 frontmatter 来自定义你的思维导图！

```yaml
# 可选，如果不设置，将生成一个随机 ID
id: markmap-example
style: |
  #${id} {
    height: 300px;
    width: 100%;
  }
  @media (min-width: 1280px) {
    #${id} {
      height: 600px;
    }
  }
options:
  colorFreezeLevel: 2
```
  
- **`style`** : 用于为思维导图定义自定义 CSS 样式。  
`${id}` 占位符可用于样式字段。在渲染期间，它将被替换为 `markmap-wrap` 的实际 ID，确保页面上的每个思维导图元素都具有唯一的样式和行为。

  
- **`options`** : 对应 markmap 项目中 [`IMarkmapJSONOptions`](https://markmap.js.org/api/interfaces/markmap-view.IMarkmapJSONOptions.html)。有关更多详细信息，请参阅 [`jsonOptions`](https://markmap.js.org/docs/json-options#option-list).

### 标签选项

你也可以直接在标签中指定高度。

```markdown
{% markmap 300px %}
# Markdown
# Syntax
{% endmarkmap %}
```

- **`height`** : 用于指定思维导图的高度。

## 示例

<details>

````markdown
{% markmap %}
---
id: markmap-example
style: |
  #${id} {
    height: 300px;
    width: 100%;
  }
  @media (min-width: 1280px) {
    #${id} {
      height: 600px;
    }
  }
options:
  colorFreezeLevel: 2
---

## Links

- [Website](https://markmap.js.org/)
- [GitHub](https://github.com/gera2ld/markmap)

## Related Projects

- [coc-markmap](https://github.com/gera2ld/coc-markmap) for Neovim
- [markmap-vscode](https://marketplace.visualstudio.com/items?itemName=gera2ld.markmap-vscode) for VSCode
- [eaf-markmap](https://github.com/emacs-eaf/eaf-markmap) for Emacs

## Features

Note that if blocks and lists appear at the same level, the lists will be ignored.

### Lists

- **strong** ~~del~~ *italic* ==highlight==
- `inline code`
- [x] checkbox
- Katex: $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$ <!-- markmap: fold -->
  - [More Katex Examples](#?d=gist:af76a4c245b302206b16aec503dbe07b:katex.md)
- Now we can wrap very very very very long text based on `maxWidth` option
- Ordered list
  1. item 1
  2. item 2

### Blocks

```js
console.log('hello, JavaScript')
```

| Products | Price |
| -------- | ----- |
| Apple    | 4     |
| Banana   | 2     |

![](https://markmap.js.org/favicon.png)
{% endmarkmap %}
````
</details>

## 配置

将相应内容追加到 `config.yml` 中。

约定大于配置，如果你不需要以下某个功能，那么无需添加该配置项。 

默认情况下即可正常工作。每个选项都有默认值。

### 默认配置

```yaml
hexo_markmap:
  darkThemeCssSelector: '.dark'
  CDN: 'fastly'
  customCDN: 'https://fastly.jsdelivr.net/npm/'
```

- **`darkThemeCssSelector`** : 用于指定暗黑主题的CSS选择器。
- **`CDN`** : 用于指定 Markmap 的 CDN。目前支持的值有 `fastly` 、 `jsdelivr`、 `unpkg`。
  - 如果设置为 `custom`，则 `customCDN` 的值将被用作 CDN 的前缀。
- **`customCDN`** : 为 Markmap 定义自定义 CDN URL。这必须是一个有效的 URL。

# 升级到 `hexo-markmap@2`

`hexo-markmap@2` 是由 [@coderxi1](https://github.com/coderxi1/) 与 [@maxchang3](https://github.com/maxchang3/) 全新重构的版本。该版本升级至最新的 Markmap，引入了更多自定义选项，具体改进包括：

- 可在单个 Markmap 标签中，通过 frontmatter 自定义：
  - CSS 样式（实现自定义高度、宽度、响应式布局等）
  - Markmap 的 [JSON Options](https://markmap.js.org/docs/json-options#option-list)
- 利用 Markmap 内置的 URL Builder 自动生成 CDN 地址
- 根据语法自动生成相应的 CDN 标签
- 支持深色模式与全屏按钮
- 使用 TypeScript 重构，并覆盖了测试用例

需要注意的是，由于部分实现细节已与 `hexo-markmap@1` 不同，如对上述新功能没有强烈需求，仍可继续使用 `hexo-markmap@1`。

若需升级至 `hexo-markmap@2`，请参考以下步骤：

1. 使用你喜欢的包管理器安装 `hexo-markmap@2`：
    ```bash
    pnpm add hexo-markmap@2 -D
    ```
    ```bash
    npm install hexo-markmap@2 --save-dev
    ```
    ```bash
    yarn add hexo-markmap@2 -D
    ```
2. 根据需要修改 `config.yml` 中的配置：

   - 以下配置项**已不再支持**：
      ```diff
      hexo_markmap:
      -  pjax: false
      -  katex: false
      -  prism: false
      -  lockView: false
      -  fixSVGAttrNaN: false
      ```
      - 当前版本已放弃对 `pjax` 的兼容性；
      - KaTeX 与 Prism.js 现可自动检测并生成相应的 CDN 标签；
      - 通过 frontmatter 中的 `options` 设置 `pan` 与 `zoom` 为 `false` 即可实现 `lockView` 效果。

   - `CDN` 配置逻辑也有所调整：
      ```diff
      hexo_markmap:
      -  - userCDN:
      -      d3_js: https://fastly.jsdelivr.net/npm/d3@6
      -      markmap_view_js: https://fastly.jsdelivr.net/npm/markmap-view@0.2.7
      -      katex_css: https://fastly.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css
      -      prism_css: https://fastly.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css
      + CDN: 'custom'
      + customCDN: 'https://fastly.jsdelivr.net/npm/'
      ```   
      - 现在的 `CDN` 配置支持 `fastly`、`jsdelivr`、`unpkg` 三个选项以及 `custom` 自定义选项；
      - 如果选择 `custom`，则 `customCDN` 的值将作为 CDN 前缀使用。

   - 此外，之前可传入的 `depth` 参数以指定折叠深度已移除，你可以在 frontmatter 中使用 `options` 配置 `initialExpandLevel`。

3. 最后，重新生成你的博客。


# 贡献者

感谢所有的贡献者🥰！

<a href="https://github.com/maxchang3/hexo-markmap/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=maxchang3/hexo-markmap" />
</a>

**感谢 [@coderxi1](https://github.com/coderxi1/) 对 v2 版本的构想与最初实现！**
