import { defineConfig } from 'tsup'
import { getPackageInfo } from 'local-pkg'

export default defineConfig({
    entry: ['src/index.ts'],
    target: 'node18',
    env: {
        TOOLBAR_VERSION: (await getPackageInfo('markmap-toolbar'))?.version ?? "",
        VIEW_VERSION: (await getPackageInfo('markmap-view'))?.version ?? "",
    },
    treeshake: true,
    clean: true,
})
