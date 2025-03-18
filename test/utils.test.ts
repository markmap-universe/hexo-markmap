import { describe, expect, it } from "vitest"
import { template, parseFrontmatter } from "@/utils"
import { vi } from 'vitest'

vi.mock('uuid', () => {
    return {
        v7: () => '0195aa9e-f1d8-74a1-aaad-362c9be73d61'
    }
})

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
        expect(parseFrontmatter(data)).toMatchInlineSnapshot(`
          {
            "id": "0195aa9e-f1d8-74a1-aaad-362c9be73d61",
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
        expect(parseFrontmatter(data)).toMatchInlineSnapshot(`
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
