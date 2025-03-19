declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOOLBAR_VERSION: string
            VIEW_VERSION: string
        }
    }
    declare interface Window {
        markmap: typeof import('markmap-view') & typeof import('markmap-toolbar')
    }
}

export {}
