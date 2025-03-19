export default () => /* javascript */`window.hexoMarkmap = (() => {
  const { Markmap, Toolbar, deriveOptions } = window.markmap
  const resize = {
    event: new Event('resize'),
    observer: new ResizeObserver((entries) =>
      entries.forEach((entry) => entry.target.dispatchEvent(resize.event))
    ),
    observe: (el, func) => {
      resize.observer.observe(el)
      el.addEventListener('resize', func)
    },
  }
  const debounce = (callback, wait) => {
    let timeout
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => callback.apply(this, args), wait)
    }
  }
  const toolbar = (markmapInstance, { fullscreenElement }) => {
    const toolbar = Toolbar.create(markmapInstance)
    toolbar.setBrand(false)
    toolbar.register({
      id: 'fullScreen',
      title: 'Full Screen View',
      content: Toolbar.icon('M4 9v-4h4v2h-2v2zM4 11v4h4v-2h-2v-2zM16 9v-4h-4v2h2v2zM16 11v4h-4v-2h2v-2z'),
      onClick: () => document.fullscreenElement ? document.exitFullscreen() : fullscreenElement.requestFullscreen()
    })
    toolbar.setItems([...toolbar.items, 'fullScreen'])
    return toolbar.el
  }
  const init = () => document.querySelectorAll('.markmap-wrap').forEach((wrap) => {
    const [root, jsonOptions] = [].slice.call(wrap.children).map(el => JSON.parse(el.innerHTML))
    wrap.innerHTML = '<svg></svg>'
    const svg = wrap.querySelector('svg')
    const markmapInstance = Markmap.create(svg, deriveOptions(jsonOptions), root)
    wrap.append(toolbar(markmapInstance, { fullscreenElement: wrap }))
    resize.observe(wrap, debounce(() => markmapInstance.fit(), 100))
  })
  return { init, resize }
})()
window.hexoMarkmap.init()
`
