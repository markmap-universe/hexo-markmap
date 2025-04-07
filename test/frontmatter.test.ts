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
            style: 'my-style',
            options: {
                key: 'value'
            }
        }
        expect(parseFrontmatter(data)).toMatchInlineSnapshot(`
          {
            "id": "my-id",
            "markmap": {},
            "options": {
              "key": "value",
            },
          }
        `)
    })
})
