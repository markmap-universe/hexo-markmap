import { z } from 'zod'
import { AVAILABLE_PROVIDERS, DEFAULT_PROVIDER_NAME } from './transformer'
import { fromError } from 'zod-validation-error'


const configSchema = z.object({
    CDN: z.enum(AVAILABLE_PROVIDERS).optional().default(DEFAULT_PROVIDER_NAME),
    darkThemeCssSelector: z.string().optional().default('.dark'),
})

export type HexoMarkmapConfig = z.infer<typeof configSchema>

/**
 * Parse the configuration object and validate it against the schema.
 */
export const parseConfig = (config: Record<string, any> = {}) => {
    const parsedConfig = configSchema.safeParse(config)
    if (!parsedConfig.success) {
        const validationError = fromError(parsedConfig.error)
        throw new Error(validationError.message)
    }
    return parsedConfig.data as Required<HexoMarkmapConfig>
}

