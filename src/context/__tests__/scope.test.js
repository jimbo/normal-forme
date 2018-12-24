import ScopeContext, { ScopeProvider } from "../scope"

describe("module", () => {
  it("exports `ScopeContext` and `ScopeProvider`", () => {
    expect(ScopeProvider).toBe(ScopeContext.Provider)
  })
})
