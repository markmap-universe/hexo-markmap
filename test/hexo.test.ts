import { describe, expect, it } from "vitest"
import { extendMock } from "./setup"
import "@/index"

type Hexo = typeof hexo

type RegisterParams<T extends keyof Hexo["extend"]> =
    Hexo["extend"][T] extends { register: any }
    ? Parameters<Hexo["extend"][T]['register']>
    : never

type RegisterFn<T extends keyof Hexo["extend"]> = RegisterParams<T>[1]

describe("Hexo Markmap Plugin", () => {
    // Extract the registered functions from mocks
    const tagFn = extendMock.tagRegister.mock.calls[0][1] as RegisterFn<'tag'>
    const generatorFn = extendMock.generatorRegister.mock.calls[0][1] as RegisterFn<'generator'>
    const filterFn = extendMock.filterRegister.mock.calls[0][1] as RegisterFn<'filter'>

    it("should return rendered HTML from the tag", () => {
        const content = "# Hello World"
        const height = "500px"

        const result = tagFn.call({ slug: 'test' }, [height], content)

        expect(result).toMatchInlineSnapshot(`
          "<div class="markmap-wrap" 
                
                style="height: 500px"
              >
                <script type="application/json">{"content":"Hello World","children":[],"payload":{"tag":"h1","lines":"0,1"}}</script>
                <script type="application/json">{}</script>
              </div>"
        `)
    })

    it("should return the correct generator", () => {
        type Generator = {
            path: string,
            data: () => string | Buffer,
        }[]

        const result = generatorFn.call({ path: () => 'test' }, { data: () => Buffer.from('test data') })

        expect(result).toBeDefined()
        result.forEach((item: Generator[number]) => {
            expect(item).toHaveProperty('path')
            expect(item).toHaveProperty('data')
            expect(item.data).toBeInstanceOf(Function)
        })
    })

    it("should return the correct assets HTML from the filter", () => {
        const callTagOnSamePage = () => {
            const content = `
# Hello World
- Hello
- Katex: $x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$ <!-- markmap: fold -->
- \`\`\`markdown
  # Hello World
  \`\`\`
            `
            const height = "500px"
            tagFn.call({ slug: 'test' }, [height], content)
        }
        // Test merge assets
        callTagOnSamePage()

        const data = {
            content: "",
            slug: "test",
        }

        filterFn.call({}, data)

        expect(data.content).toMatchSnapshot()
  
    })
})
