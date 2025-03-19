import * as _ from 'radashi'
import { z } from 'zod'
import { fromError } from 'zod-validation-error'
import { xxh64 } from "@node-rs/xxhash"
import { UrlBuilder } from "markmap-common"
import { Transformer } from 'markmap-lib'

/**
 * Replace data by name in template strings. 
 */
export const template = (
    str: string = "",
    data: Record<string, any>,
    regex: RegExp = /\$\{(.+?)\}/g
) => _.template(str, data, regex)

const frontmatterSchema = z.object({
    id: z.string().optional(),
    style: z.string().optional().default(""),
    options: z.object({}).passthrough().optional().default({}),
})

let counter = 0x39
/**
 * Generate a short id from an identifier.
 * @param identifier The identifier to generate a short id.
 */
export const generateShortId = (identifier: string) =>
    `hmm-${counter++}${xxh64(identifier).toString(16).slice(0, 8)}`

/**
 * Parse frontmatter with default values.
 * @param data The frontmatter data to parse.
 * @param identifier The identifier to generate a default id.
 */
export const parseFrontmatter = (data: Record<string, any> = {}, identifier: string) => {
    const parsedData = frontmatterSchema.safeParse(data)
    if (!parsedData.success) {
        const validationError = fromError(parsedData.error)
        throw new Error(validationError.message)
    }
    if (parsedData.data && !parsedData.data.id) {
        parsedData.data.id = generateShortId(identifier)
    }
    return parsedData.data as Required<z.infer<typeof frontmatterSchema>>
}

/**
 * Extended Map with entry method, helps to write more readable code.
 */
export class ExtendedMap<K, V> extends Map<K, V> {
    entry(key: K) {
        const entryContext = {
            and: (modifier: (v: V) => void) => {
                if (this.has(key)) modifier(this.get(key)!)
                return entryContext
            },
            or_insert: (defaultFactory: () => V) => {
                if (!this.has(key)) this.set(key, defaultFactory())
                return this.get(key)!
            }
        }
        return entryContext
    }
}

const availableProviders = ['jsdelivr', 'fastly', 'unpkg'] as const

type AvailableProviders = typeof availableProviders[number]

const DEFAULT_PROVIDERS = {
    jsdelivr: (path: string) => `https://cdn.jsdelivr.net/npm/${path}`,
    fastly: (path: string) => `https://fastly.jsdelivr.net/npm/${path}`,
    unpkg: (path: string) => `https://unpkg.com/${path}`,
} satisfies Record<AvailableProviders, (path: string) => string>

const DEFAULT_PROVIDER: AvailableProviders = 'fastly'

/**
 * Get a URL builder with a specified default provider.
 */
const getURLBuilder = (defaultProvider: AvailableProviders = DEFAULT_PROVIDER) => {
    type IURLBuilder<P extends string> = UrlBuilder & {
        setProvider(name: P, factory: Parameters<UrlBuilder['setProvider']>[1]): void
        getFullUrl(path: Parameters<UrlBuilder['getFullUrl']>[0], provider?: P): string
        provider: P,
        providers: Record<P, (path: string) => string>
    }

    const urlBuilder = new UrlBuilder() as IURLBuilder<AvailableProviders>

    for (const key of availableProviders) {
        urlBuilder.setProvider(key, DEFAULT_PROVIDERS[key])
    }

    urlBuilder.provider = defaultProvider

    return urlBuilder
}

/**
 * Get a transformer with a specified default provider.
 */
export const getTransformer = (defaultProvider?: AvailableProviders) => {
    const urlBuilder = getURLBuilder(defaultProvider)

    const transformer = new Transformer() as Transformer & {
        urlBuilder: typeof urlBuilder
    }

    transformer.urlBuilder = urlBuilder

    return transformer
}

const configSchema = z.object({
    CDN: z.enum(availableProviders).optional().default(DEFAULT_PROVIDER),
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

