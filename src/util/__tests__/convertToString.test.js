import convertToString from "../convertToString"

describe("convertToString", () => {
  it("returns a string", () => {
    const string = convertToString()

    expect(string).toBe("")
  })

  it("converts `null` to an empty string", () => {
    const string = convertToString(null)

    expect(string).toBe("")
  })

  it("converts a number to a string", () => {
    const zero = convertToString(0)
    const one = convertToString(1)

    expect(zero).toBe("0")
    expect(one).toBe("1")
  })

  it("converts a boolean to a string", () => {
    const truthy = convertToString(true)
    const falsy = convertToString(false)

    expect(truthy).toBe("true")
    expect(falsy).toBe("false")
  })

  it("converts an array to a comma-delimited string", () => {
    const empty = convertToString([])
    const full = convertToString(["a", "b"])

    expect(empty).toBe("")
    expect(full).toBe("a,b")
  })
})
