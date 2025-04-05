import { vi } from "vitest"

export const filterRegisterMock = vi.fn()
export const generatorRegisterMock = vi.fn()
export const tagRegisterMock = vi.fn()

vi.stubEnv('VIEW_VERSION', '0.18.10')
vi.stubEnv('TOOLBAR_VERSION', '0.18.10')

vi.stubGlobal('hexo', {
    extend: {
        tag: {
            register: tagRegisterMock,
        },
        filter: {
            register: filterRegisterMock,
        },
        generator: {
            register: generatorRegisterMock,
        },
        helper: {
            get(name: string) {
                if (name === "js") {
                    return vi.fn((path: string) => `<script src="${path}"></script>`)
                } else if (name === "css") {
                    return vi.fn((path: string) => `<link rel="stylesheet" href="${path}">`)
                }
                return undefined
            }
        }
    },
    config: {
        'hexo_markmap': {
            color: 'blue',
        }
    }
})
