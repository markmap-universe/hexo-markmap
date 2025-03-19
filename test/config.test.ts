import { parseConfig } from "@/utils"
import { describe, expect, it } from "vitest"

describe('Config', ()=> {
    it('should return the default config', () => {
        const config = parseConfig({})
        expect(config).toMatchInlineSnapshot(`
          {
            "CDN": "fastly",
            "darkThemeCssSelector": ".dark",
          }
        `)
    })

    it('should return the config with the provided values', () => {
        const config = parseConfig({
            CDN: 'jsdelivr',
            darkThemeCssSelector: '.my-dark'
        })
        expect(config).toMatchInlineSnapshot(`
          {
            "CDN": "jsdelivr",
            "darkThemeCssSelector": ".my-dark",
          }
        `)
    })
})
