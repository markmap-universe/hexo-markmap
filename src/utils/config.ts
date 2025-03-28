import { z } from 'zod'
import { AVAILABLE_PROVIDERS, DEFAULT_PROVIDER_NAME } from './transformer'
import { fromError } from 'zod-validation-error'


const configSchema = z.object({
    globalOptions: z.object({}).passthrough().optional().default({}),
    CDN: z.enum(AVAILABLE_PROVIDERS).optional().default(DEFAULT_PROVIDER_NAME),
    customCDN: z.string().url().optional(),
    darkThemeCssSelector: z.string().optional().default('.dark'),
})

export type HexoMarkmapConfig = z.infer<typeof configSchema>

/**
 * Check and filter out deprecated configuration keys
 */
export const checkOldConfig = (config: Record<string, any> = {}): Record<string, any> => {
    const deprecatedKeys = [
        'pjax',
        'katex',
        'prism',
        'userCDN',
        'lockView',
        'fixSVGAttrNaN'
    ]

    const hasDeprecatedKeys = deprecatedKeys.some(key => key in config)

    if (!hasDeprecatedKeys) return config

    const WARN_PREFIX = '\x1b[33mWARN\x1b[0m [hexo-markmap]'

    console.warn(`${WARN_PREFIX} Deprecated configuration options detected. These options will be ignored:`, deprecatedKeys)

    if ('userCDN' in config) {
        console.warn(`${WARN_PREFIX} The userCDN option is deprecated. Please set the CDN option to 'custom' and use the \`customCDN\` option instead.`)
    }

    if ('lockView' in config) {
        console.warn(`${WARN_PREFIX} The lockView option is deprecated and will be ignored.`)
    }

    return Object.fromEntries(
        Object.entries(config).filter(([key]) => !deprecatedKeys.includes(key))
    )
}

/**
 * Parse the configuration object and validate it against the schema.
 */
export const parseConfig = (config: Record<string, any> = {}) => {
    const filteredConfig = checkOldConfig(config)
    const parsedConfig = configSchema.safeParse(filteredConfig)
    if (!parsedConfig.success) {
        const validationError = fromError(parsedConfig.error)
        throw new Error(validationError.message)
    }
    return parsedConfig.data as Required<HexoMarkmapConfig>
}

