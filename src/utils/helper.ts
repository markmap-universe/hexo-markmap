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
