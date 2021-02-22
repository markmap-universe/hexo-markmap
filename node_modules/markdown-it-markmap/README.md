# markdown-it-markmap

> Markmap plugin for markdown-it markdown parser.

With this plugin you can create mindmap using [markmap](https://markmap.js.org/).

It adds a named fence _mindmap_ to the markdown parser.

## Installation

```bash
$ yarn add https://github.com/deiv/markdown-it-markmap.git
```

## Usage

Configure the plugin in markdown-it:

```js
var markdownIt = require('markdown-it');
var markdownItMarkmap = require('../build/index');

const mdi = markdownIt();
mdi.use(markdownItMarkmap);

let mindmapContent = `
\`\`\`mindmap
# root
## child1
  - child3
## child2
  - child3
\`\`\``;


console.log(mdi.render(mindmapContent));
```

Add needed libraries in browser:

```html
<script src="https://cdn.jsdelivr.net/npm/d3@5"></script>
<script src="https://cdn.jsdelivr.net/npm/markmap-lib@0.7.4/dist/browser/view.min.js"></script>
<script>
    const mindmaps = document.querySelectorAll('.markmap-svg');

    for(const mindmap of mindmaps) {
        markmap.markmap(mindmap, JSON.parse(mindmap.innerHTML));
    }
</script>
```

## Example

Markdown example:
```markdown
```mindmap
# root
## child1
  - child3
## child2
  - child3
```

## License

[MIT](LICENSE)
