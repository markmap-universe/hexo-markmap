import * as _ from 'radashi'

/**
 * Replace data by name in template strings. 
 */
export const template = (
    str: string = "",
    data: Record<string, any>,
    regex: RegExp = /\$\{(.+?)\}/g
) => _.template(str, data, regex)

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
