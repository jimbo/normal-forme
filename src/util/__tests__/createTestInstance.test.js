import { createElement } from "react"

import createTestInstance from "../createTestInstance"

describe("createTestInstance", () => {
  it("returns a TestRenderer instance", () => {
    const instance = createTestInstance(<i />)

    expect(instance).toMatchObject({
      getInstance: expect.any(Function),
      root: expect.anything(),
      toJSON: expect.any(Function),
      toTree: expect.any(Function),
      unmount: expect.any(Function),
      update: expect.any(Function),
    })
  })
})
