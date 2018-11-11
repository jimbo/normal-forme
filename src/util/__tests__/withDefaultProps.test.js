import withDefaultProps from "../withDefaultProps"

describe("withDefaultProps", () => {
  it("returns a function", () => {
    const merge = withDefaultProps({})

    expect(merge).toBeInstanceOf(Function)
  })
})

describe("withDefaultProps's return function", () => {
  it("returns a new object", () => {
    const props = {}
    const merge = withDefaultProps({})

    expect(merge(props)).toEqual({})
    expect(merge(props)).not.toBe(props)
  })

  it("applies default props for undefined props only", () => {
    const props = {
      a: void 0,
      b: null,
      c: false,
      d: "",
      e: 0,
    }

    const defaultProps = {
      a: "default",
      b: "default",
      c: "default",
      d: "default",
      e: "default",
    }

    const merge = withDefaultProps(defaultProps)

    expect(merge(props)).toEqual({ ...props, a: "default" })
  })
})
