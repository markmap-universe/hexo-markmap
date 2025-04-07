import { parseFrontmatter } from "@/utils"
import { describe, expect, it } from "vitest"

describe("parse frontmatter", () => {
    it("should return the parsed frontmatter with the default values", () => {
        const data = {}
        expect(parseFrontmatter(data)).toMatchInlineSnapshot(`
          {
            "markmap": {},
            "options": {},
          }
        `)
    })

    it("should return the parsed frontmatter with the provided values", () => {
        const data = {
            id: 'my-id',
            markmap: {
                key: 'value'
            }
        }
        expect(parseFrontmatter(data)).toMatchInlineSnapshot(`
          {
            "id": "my-id",
            "markmap": {
              "key": "value",
            },
            "options": {},
          }
        `)
    })
})
