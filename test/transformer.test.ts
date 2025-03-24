import { getTransformer } from "@/utils"
import { beforeEach, describe, expect, it } from "vitest"

describe("Wrapped transformer and its urlBuilder", () => {
    const transformer = getTransformer()
    const { urlBuilder } = transformer

    beforeEach(() => {
        urlBuilder.provider = 'jsdelivr'
    })

    it("should build correct url", () => {
        expect(urlBuilder.getFullUrl('d3@7')).toMatchInlineSnapshot(`"https://cdn.jsdelivr.net/npm/d3@7"`)
    })

    it("should build correct url with custom provider", () => {
        urlBuilder.provider = 'fastly'
        expect(urlBuilder.getFullUrl('d3@7')).toMatchInlineSnapshot(`"https://fastly.jsdelivr.net/npm/d3@7"`)
    })

    it("should build correct url with custom provider", () => {
        urlBuilder.setProvider('custom', (path) => `https://cdn.example.com/${path}`)
        urlBuilder.provider = 'custom'
        expect(urlBuilder.getFullUrl('d3@7')).toMatchInlineSnapshot(`"https://cdn.example.com/d3@7"`)
    })

})
