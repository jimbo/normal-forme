import { join, split } from "../path"

describe("split", () => {
  it("returns an array", () => {
    const parts = split("")

    expect(parts).toBeInstanceOf(Array)
    expect(parts).toHaveLength(0)
  })

  it("isolates dot-delimited properties", () => {
    const objectPath = "a.b.c"
    const parts = split(objectPath)

    expect(parts).toHaveLength(3)
    expect(parts).toEqual(["a", "b", "c"])
  })

  it("isolates bracketed indices", () => {
    const arrayPath = "a[0][1]"
    const parts = split(arrayPath)

    expect(parts).toHaveLength(3)
    expect(parts).toEqual(["a", "[0]", "[1]"])
  })

  it("doesn't isolate bracketed properties", () => {
    const objectPath = "a['b'].c"
    const parts = split(objectPath)

    expect(parts).toHaveLength(2)
    expect(parts).toEqual(["a['b']", "c"])
  })

  it("captures brackets, but discards dots", () => {
    const mixedPath = "a.b[0].c"
    const parts = split(mixedPath)

    expect(parts).toHaveLength(4)
    expect(parts).toEqual(["a", "b", "[0]", "c"])
  })

  it("treats bare digits as properties, not indices", () => {
    const objectPath = "a.0.b"
    const parts = split(objectPath)

    expect(parts).toHaveLength(3)
    expect(parts).toEqual(["a", "0", "b"])
  })
})

describe("join", () => {
  it("returns a string", () => {
    expect(join()).toBe("")
  })

  it("joins parts with a dot", () => {
    const parts = ["a", "b", "c"]

    expect(join(...parts)).toBe("a.b.c")
  })

  it("joins parts with a dot", () => {
    const parts = ["a", "b", "c"]

    expect(join(...parts)).toBe("a.b.c")
  })

  it("omits leading and trailing dots", () => {
    expect(join("a")).toBe("a")
  })

  it("omits empty parts", () => {
    const parts = ["", "b", "c", "", "e"]

    expect(join(...parts)).toBe("b.c.e")
  })
})
