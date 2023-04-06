const mainTemplate = ({ pjaxEnable, katexEnable, prismEnable, userCDN}) => `
  const initMarkmap = async () => {
    const debounce = (callback, wait) => {
      let timeout;
      return function (...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => callback.apply(this, args), wait);
      };
    }
    const markmapResize = new CustomEvent('markmapResize')
    const robserver = new ResizeObserver((entries) => {
        entries.forEach(entry => entry.target.dispatchEvent(markmapResize))
    })
    ${pjaxEnable ? `document.addEventListener("pjax:send", () => { robserver.disconnect() })` : ''}
    const autoFit = (el, obj) => {
        robserver.observe(el.parentNode)
        el.parentNode.addEventListener('markmapResize', debounce(() => obj.fit(), 100))
    }
    const createMarkmap = () => {
        document.querySelectorAll('.markmap-container>svg').forEach(el => {
          let obj = markmap.Markmap.create(el, { autoFit: true }, JSON.parse(el.getAttribute('data')))
          autoFit(el, obj)
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
      for (let [name, value] of Object.entries(attr)) {
        el[name] = value
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
    await loadScript(CDN.js.d3)
    await loadScript(CDN.js.markmap_view)
    await Promise.all(CDN.css.map(loadCSS))

    createMarkmap()
}
if(document.querySelector('.markmap-container')) {
  initMarkmap()
}
${pjaxEnable ? `document.addEventListener("pjax:complete", initMarkmap)` : ''}`

const containerTemplate = (svgData, { height }) => `
<div class="markmap-container" style="height:${height}">
  <svg data="${escapeData(JSON.stringify(svgData))}"></svg>
</div>
`

const scriptTemplate = (root) => `<script src="${root}js/markmap.js"></script>`

const escapeData = (s) =>
  !s ? "" : s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\'/g, "&#39;")
    .replace(/\"/g, "&quot;")

const afterRender = (content, html, { pjaxEnable }) => {
  // ref: https://blog.hvnobug.com/post/hexo-script#after_render
  if (pjaxEnable || /<\/body>/gi.test(content) && /<div class="[^"]*?markmap[^"]*?"/gi.test(content)) {
    const lastIndex = content.lastIndexOf('</body>')
    return content.substring(0, lastIndex) + html + content.substring(lastIndex, content.length)
  }
  return content;
}

module.exports = { mainTemplate, containerTemplate, scriptTemplate, afterRender }
