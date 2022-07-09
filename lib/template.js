const mainTemplate = ({ katexEnable, prismEnable })=> {  
  const scripts = `
  // 使用闭包，防止污染全局
function loadMarkmap()
{
  // 初始化markmap
  function initMarkmap(){
    const sources = [
      {
        type:'css_text',
        enable: true,
        value: '.markmap-container{display:flex;justify-content:center;margin:0 auto;width:90%;height:500px}.markmap-container svg{width:100%;height:100%}@media(max-width:768px){.markmap-container{height:400px}}',
      },
      {
        type: 'css_src',
        value: 'https://fastly.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
        enable: ${katexEnable}
      },
      {
        type: 'css_src',
        value: 'https://fastly.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css',
        enable: ${prismEnable}
      },
      {
        type: 'js_src',
        value: 'https://cdn.jsdelivr.net/npm/d3@6',
        enable: true
      },
      {
        type: 'js_src',
        value: 'https://cdn.jsdelivr.net/npm/markmap-view@0.2.7',
        enable: true
      }
    ]
      
    // 判断是否有markmap
    const markupContainers = document.querySelectorAll('.markmap-container>svg')
  
    // 说明没有脑图
    if(markupContainers.length<1)return
  
    console.log('exist markmap,initializing...')
    
    // 说明已经加载
    if(window.markmap){
      // 直接初始化
      crateMarkmap()
      return
    }
  
    // 加载所有的 css,js
    const promiseArr = sources.filter(x=>x.enable)
    .map(x=>{
      switch(x.type){
        case 'css_text':
          return dynamicLoadCssText(x.value)
        case 'css_src':
          return dynamicLoadCssUrl(x.value)
        case 'js_src':
          return dynamicLoadJs(x.value)
        default:
          return null
      }
    }).filter(x=>x)

    if(promiseArr && promiseArr.length>0)
    {
      // 脚本全部加载完成后再执行 markmap 初始化  
      Promise.all(promiseArr).then(x=>{        
        crateMarkmap()
      })
    }
  }
  
  // 动态加载 js
  function dynamicLoadJs(url){
    const element = document.createElement('script')
    element.setAttribute('type', 'text/javascript')
    element.src = url
    return dynamicLoadElement(element)
  }
  
  // 动态加载文本型 css
  function dynamicLoadCssText(cssText){
    const element = document.createElement("style")
    element.appendChild(document.createTextNode(cssText))
    return dynamicLoadElement(element)
  }
  
  // 动态加载 url 型 css
  function dynamicLoadCssUrl(url){  
    const element = document.createElement('link')
    element.href = url
    element.setAttribute('rel', 'stylesheet')
    element.setAttribute('media', 'all')
    element.setAttribute('type', 'text/css')
    
    return dynamicLoadElement(element)
  }
  
  // 将创建的元素添加到 head 中
  function dynamicLoadElement(element){
    const promise = new Promise((resolve)=>{
      const head = document.getElementsByTagName('head')[0]
      if (element.readyState) {
        element.onreadystatechange = () => {
          if (element.readyState === 'loaded' || element.readyState === 'complete') {
            element.onreadystatechange = null
            resolve()
          }
        }
      } else {
        element.onload = resolve
      }
      head.appendChild(element)      
    })
  
    return promise
  }
  
  function crateMarkmap(){
    const eles = document.querySelectorAll('.markmap-container>svg')
    eles.forEach(mindmap => window.markmap.Markmap.create(mindmap, null, JSON.parse(mindmap.getAttribute('data'))))
  }
  
  // 监听事件
  document.addEventListener("pjax:complete",(arg)=>{
    initMarkmap()
  })
  
  initMarkmap()
}

loadMarkmap()
  `
  return `<script>${scripts}</script>`
}

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
  if (!/<\/body>/gi.test(content) || !/<div class="[^"]*?markmap[^"]*?"/gi.test(content)) return content;
  const lastIndex = content.lastIndexOf('</body>');
  return content.substring(0, lastIndex) + html + content.substring(lastIndex, content.length);
}

module.exports = { mainTemplate, containerTemplate, afterRender }
