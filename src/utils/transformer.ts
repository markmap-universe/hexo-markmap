import { UrlBuilder } from "markmap-common"
import { Transformer } from 'markmap-lib'

export const AVAILABLE_PROVIDERS = ['jsdelivr', 'fastly', 'unpkg'] as const

type AvailableProviders = typeof AVAILABLE_PROVIDERS[number]

export const DEFAULT_PROVIDER_FACTORIES = {
    jsdelivr: (path: string) => `https://cdn.jsdelivr.net/npm/${path}`,
    fastly: (path: string) => `https://fastly.jsdelivr.net/npm/${path}`,
    unpkg: (path: string) => `https://unpkg.com/${path}`,
} satisfies Record<AvailableProviders, (path: string) => string>

export const DEFAULT_PROVIDER_NAME: AvailableProviders = 'fastly'

/**
 * Create a URL builder with a specified default provider.
 */
const createUrlBuilder = (defaultProviderName: AvailableProviders = DEFAULT_PROVIDER_NAME) => {
    type TypedUrlBuilder<P extends string> = UrlBuilder & {
        setProvider(name: P, factory: Parameters<UrlBuilder['setProvider']>[1]): void
        getFullUrl(path: Parameters<UrlBuilder['getFullUrl']>[0], provider?: P): string
        provider: P,
        providers: Record<P, (path: string) => string>
    }

    const urlBuilder = new UrlBuilder() as TypedUrlBuilder<AvailableProviders>

    for (const key of AVAILABLE_PROVIDERS) {
        urlBuilder.setProvider(key, DEFAULT_PROVIDER_FACTORIES[key])
    }

    urlBuilder.provider = defaultProviderName

    return urlBuilder
}

/**
 * Get a transformer with a specified default provider.
 */
export const getTransformer = (defaultProvider?: AvailableProviders) => {
    const urlBuilder = createUrlBuilder(defaultProvider)

    const transformer = new Transformer() as Transformer & {
        urlBuilder: typeof urlBuilder
    }

    transformer.urlBuilder = urlBuilder

    return transformer
}
