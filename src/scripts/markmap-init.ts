import type { Markmap } from "markmap-view"
import { debounce } from "radashi"

window.hexoMarkmap = (() => {
  const { Markmap, Toolbar, deriveOptions } = window.markmap

  const resize = {
    observer: new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const callback = resize.listeners.get(entry.target)
        if (callback) callback()
      })
    }),
    listeners: new Map<Element, () => void>(),
    observe(el: Element, func: () => void) {
      if (!(el instanceof Element) || typeof func !== "function") return
      if (!this.listeners.has(el)) {
        this.listeners.set(el, func)
        this.observer.observe(el)
      }
    },
    destroyAll() {
      this.listeners.forEach((_, el) => {
        this.observer.unobserve(el)
      })
      this.listeners.clear()
    }
  }

  const toolbar = (markmapInstance: Markmap, { fullscreenElement }: { fullscreenElement: Element }) => {
    const toolbar = Toolbar.create(markmapInstance)
    toolbar.setBrand(false)
    toolbar.register({
      id: 'fullScreen',
      title: 'Full Screen View',
      content: Toolbar.icon('M4 9v-4h4v2h-2v2zM4 11v4h4v-2h-2v-2zM16 9v-4h-4v2h2v2zM16 11v4h-4v-2h2v-2z'),
      onClick: () => document.fullscreenElement
        ? document.exitFullscreen()
        : fullscreenElement.requestFullscreen(),
    })
    toolbar.setItems([...toolbar.items, 'fullScreen'])
    fullscreenElement.addEventListener('fullscreenchange', () => {
      const isFullscreen = document.fullscreenElement === fullscreenElement
      fullscreenElement.classList.toggle('fullscreen', isFullscreen)
    })
    return toolbar.el
  }

  const updateMarkmapSize = (markmapInstance: Markmap, autoHeight: boolean) => {
    const svg: SVGSVGElement = markmapInstance.svg.node()
    if (autoHeight) {
      const { y2: height } = markmapInstance.state.rect
      svg.style.height = String(height)
    }
    markmapInstance.fit()
  }

  const init = () => {
    document.querySelectorAll<HTMLElement>('.markmap-wrap').forEach((wrapper) => {
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
      const autoHeight = !wrapper.style.height
      resize.observe(wrapper, debounce({ delay: 100 }, () => updateMarkmapSize(markmapInstance, autoHeight)))
    })
  }

  return { init, resize }
})()

window.hexoMarkmap.init()
