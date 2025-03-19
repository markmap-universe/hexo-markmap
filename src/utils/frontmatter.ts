import { z } from 'zod'
import { fromError } from 'zod-validation-error'
import { xxh64 } from "@node-rs/xxhash"

let counter = 0x39

const frontmatterSchema = z.object({
    id: z.string().optional(),
    style: z.string().optional().default(""),
    options: z.object({}).passthrough().optional().default({}),
})

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
