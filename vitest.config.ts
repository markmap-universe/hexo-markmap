import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    test: {
        setupFiles: ['./test/hexo.ts'],
    },
    plugins: [tsconfigPaths()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('src/', import.meta.url)),
        },
    },
})
