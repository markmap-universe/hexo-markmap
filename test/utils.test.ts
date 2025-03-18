import { describe, expect, it } from "vitest"
import { template, parseFrontmatter } from "@/utils"

describe("template", () => {
    it("should return a string with the template values replaced", () => {
        const style = `
        #\${id} {
            height: 300px;
            width: 100%;
        }
        @media (min-width: 1280px) {
            #\${id} {
                height: 600px;
            }
        }`
        const id = 'my-id'
        expect(template(style, { id })).toMatchInlineSnapshot(`
          "
                  #my-id {
                      height: 300px;
                      width: 100%;
                  }
                  @media (min-width: 1280px) {
                      #my-id {
                          height: 600px;
                      }
                  }"
        `)
    })
    it("should return an empty string if the template is `undefined`", () => {
        expect(template(undefined, {})).toMatch(``)
    })
})

describe("parseFrontmatter", () => {
    it("should return the parsed frontmatter with the default values", () => {
        const data = {}
        expect(parseFrontmatter(data, 'test')).toMatchInlineSnapshot(`
          {
            "id": "4fdcca5d",
            "options": {},
            "style": "",
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
        expect(parseFrontmatter(data, 'test')).toMatchInlineSnapshot(`
          {
            "id": "my-id",
            "options": {
              "key": "value",
            },
            "style": "my-style",
          }
        `)
    })
})
