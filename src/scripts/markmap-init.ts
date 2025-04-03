import { debounce } from "radashi"

window.hexoMarkmap = (() => {
  const { Markmap, Toolbar, deriveOptions } = window.markmap
  const resize = {
    event: new Event('resize'),
    observer: new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.dispatchEvent(resize.event)
      })
    }),
    listeners: new WeakMap(),
    observe: (el, func) => {
      if (!(el instanceof Element) || typeof func !== "function") return
      if (!resize.listeners.has(el)) {
        resize.listeners.set(el, func)
        el.addEventListener("resize", func)
        resize.observer.observe(el)
      }
    },
  }
  const toolbar = (markmapInstance, { fullscreenElement }) => {
    const toolbar = Toolbar.create(markmapInstance)
    toolbar.setBrand(false)
    toolbar.register({
      id: 'fullScreen',
      title: 'Full Screen View',
      content: Toolbar.icon('M4 9v-4h4v2h-2v2zM4 11v4h4v-2h-2v-2zM16 9v-4h-4v2h2v2zM16 11v4h-4v-2h2v-2z'),
      onClick: () => document.fullscreenElement ? document.exitFullscreen() : fullscreenElement.requestFullscreen() && markmapInstance.fit()
    })
    toolbar.setItems([...toolbar.items, 'fullScreen'])
    return toolbar.el
  }
  const updateMarkmapSize = (markmapInstance) => {
    const svg = markmapInstance.svg.node()
    const { y2: height } = markmapInstance.state.rect
    svg.style.height = String(height)
    markmapInstance.fit()
  }
  const init = () => {
    document.querySelectorAll('.markmap-wrap').forEach((wrapper) => {
      if (wrapper.children.length < 2) return
      const [root, jsonOptions] = Array.from(wrapper.children, (el) => {
        try {
          return JSON.parse(el.innerHTML)
        } catch {
          console.warn('Failed to parse JSON:', el.innerHTML)
          return null
        }
      })
      if (!root || !jsonOptions) return
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      wrapper.replaceChildren(svg)
      const markmapInstance = Markmap.create(svg, deriveOptions(jsonOptions), root)
      wrapper.appendChild(toolbar(markmapInstance, { fullscreenElement: wrapper }))
      resize.observe(wrapper, debounce({ delay: 100 }, () => updateMarkmapSize(markmapInstance)))
    })
  }
  return { init, resize }
})()
window.hexoMarkmap.init()
