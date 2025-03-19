import { describe, expect, it } from "vitest"
import { template } from "@/utils"

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
