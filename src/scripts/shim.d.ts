declare global {
    interface Window {
        markmap: typeof import('markmap-view') & typeof import('markmap-toolbar')
        hexoMarkmap: {
            init: () => void
            resize: {
                event: Event
                observer: ResizeObserver
                observe: (el: Element, func: () => void) => void
            }
        }
    }
}

export {}
