import { describe, expect, it } from "vitest"
import { template, parseFrontmatter, getTransformer } from "@/utils"
import { beforeEach } from "node:test"

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

describe("parse frontmatter", () => {
    it("should return the parsed frontmatter with the default values", () => {
        const data = {}
        expect(parseFrontmatter(data, 'test')).toMatchInlineSnapshot(`
          {
            "id": "hmm-4fdcca5d",
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

describe("URL Builder", () => {
    const transformer = getTransformer()
    const { urlBuilder } = transformer

    beforeEach(() => {
        urlBuilder.provider = 'jsdelivr'
    })

    it("should build correct url", () => {
        expect(urlBuilder.getFullUrl('d3@7')).toMatchInlineSnapshot(`"https://fastly.jsdelivr.net/npm/d3@7"`)
    })

    it("should build correct url with custom provider", () => {
        urlBuilder.provider = 'fastly'
        expect(urlBuilder.getFullUrl('d3@7')).toMatchInlineSnapshot(`"https://fastly.jsdelivr.net/npm/d3@7"`)
    })

})
