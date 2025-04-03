declare global {
    interface Window {
        markmap: typeof import('markmap-view') & typeof import('markmap-toolbar')
        hexoMarkmap: {
            init: () => void
            resize: {
                observe: (el: Element, func: () => void) => void,
                destroyAll: () => void
            }
        }
    }
}

export {}
