import * as _ from 'radashi'
import { z } from 'zod'
import { fromError } from 'zod-validation-error'
import { v7 as uuidv7 } from 'uuid'

/**
 * Replace data by name in template strings. The default expression looks for {name} to identify names.
 */
export const template = (
    str: string = "",
    data: Record<string, any>,
    regex: RegExp = /\$\{(.+?)\}/g
) => _.template(str, data, regex)


const frontmatterSchema = z.object({
    id: z.string().optional().default(() => uuidv7()),
    style: z.string().optional().default(""),
    options: z.object({}).passthrough().optional().default({}),
})

export const parseFrontmatter = (data: Record<string, any>) => {
    const parsedData = frontmatterSchema.safeParse(data)
    if (!parsedData.success) {
        const validationError = fromError(parsedData.error)
        console.error(validationError.message)
    }
    return parsedData.data as z.infer<typeof frontmatterSchema>
}
