const mainTemplate = ({ katexEnable, prismEnable, userCDN }) => `<script>
const initMarkmap = async () => {
  const createMarkmap = () => {
    console.log(markmap)
    document.querySelectorAll('.markmap-container>svg').forEach(el => {
      markmap.Markmap.create(el, null, JSON.parse(el.getAttribute('data')))
    })
  }
  if (window.markmap && Object.keys(window.markmap).length != 0) { createMarkmap(); return }
  const CDN = {
    "js": {
      "d3": ${userCDN?.d3_js || "'https://fastly.jsdelivr.net/npm/d3@6',"}
      "markmap_view": ${userCDN?.markmap_view_js || "'https://fastly.jsdelivr.net/npm/markmap-view@0.2.7',"}
    },
    "css": [
      ${katexEnable ? `${userCDN?.katex_css || "'https://fastly.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',"}` : ""}
      ${prismEnable ? `${userCDN?.prism_css || "'https://fastly.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css',"}` : ""}
    ],
  }
  
  const loadElement = (elname, attr) => {
    const el = document.createElement(elname)
    for (let name in attr) {
      el[name] = attr[name]
    }
    document.body.appendChild(el);
    return new Promise((res, rej) => {
      el.onload = res
      el.onerror = rej
    })
  }
  const loadScript = (url) => loadElement('script', { 'src': url })
  const loadCSS = (url) => loadElement('link', { 'href': url, 'rel': "stylesheet" })
  const loadStyle = (style) => document.head.insertAdjacentHTML("beforeend", "<style>.markmap-container{display:flex;justify-content:center;margin:0 auto;width:90%;height:500px}.markmap-container svg{width:100%;height:100%}@media(max-width:768px){.markmap-container{height:400px}}</style>")
  loadStyle()
  await loadScript(CDN.js.d3) // d3 必须在 markmap view 之前加载
  await loadScript(CDN.js.markmap_view)
  await Promise.all(CDN.css.map(loadCSS))

  createMarkmap()
}
initMarkmap()
document.addEventListener("pjax:complete", initMarkmap)
</script>
`

const containerTemplate = (svgData, { height }) => `
<div class="markmap-container" style="height:${height}">
  <svg data="${escapeData(JSON.stringify(svgData))}"></svg>
</div>
`

function escapeData(s) {
  return !s ? "" : s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\'/g, "&#39;")
    .replace(/\"/g, "&quot;")
}

const afterRender = (content, html) => {
  // ref: https://blog.hvnobug.com/post/hexo-script#after_render
  // 判断是否存在 body 且有 markmap 标签，后续则不用额外判断。
  if (!/<\/body>/gi.test(content) || !/<div class="[^"]*?markmap[^"]*?"/gi.test(content)) return content;
  const lastIndex = content.lastIndexOf('</body>');
  return content.substring(0, lastIndex) + html + content.substring(lastIndex, content.length);
}

module.exports = { mainTemplate, containerTemplate, afterRender }
