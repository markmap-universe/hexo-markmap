import { parseConfig } from "@/utils"
import { describe, expect, it } from "vitest"

describe('Config', ()=> {
    it('should return the default config', () => {
        const config = parseConfig({})
        expect(config).toMatchInlineSnapshot(`
          {
            "CDN": "fastly",
            "darkThemeCssSelector": ".dark",
            "globalOptions": {},
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
            "globalOptions": {},
          }
        `)
    })

    it('should not throw an error if the config of the old version is provided', () => {
        const config = parseConfig({
          "pjax": false,
          "katex": false,
          "prism": false,
          "userCDN": {
            "d3_js": "https://fastly.jsdelivr.net/npm/d3@6",
            "markmap_view_js": "https://fastly.jsdelivr.net/npm/markmap-view@0.2.7",
            "katex_css": "https://fastly.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css",
            "prism_css": "https://fastly.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css"
          },
          "lockView": false,
          "fixSVGAttrNaN": false
        })
        expect(config).toMatchInlineSnapshot(`
          {
            "CDN": "fastly",
            "darkThemeCssSelector": ".dark",
            "globalOptions": {},
          }
        `)
    })
    
})
