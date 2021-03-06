import { createElement } from "react"
import renderer from "react-test-renderer"

import { init, reducer, useFormState } from "../form"

const log = jest.fn()
const identity = val => val
const initialState = init()
const toUpperCase = val => val.toUpperCase()
const simpleValueMap = new Map().set("a", "b")

describe("useFormState", () => {
  it("returns a store", () => {
    const Component = () => {
      const store = useFormState()
      log(store)
      return <i />
    }

    renderer.create(<Component />)

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenLastCalledWith([
      expect.objectContaining({
        fieldMap: expect.any(Map),
        valueMap: expect.any(Map),
      }),
      expect.any(Function),
    ])
  })

  it("applies initial values if provided", () => {
    const initialValueMap = new Map().set("a", "b")
    const Component = () => {
      const store = useFormState({ initialValueMap })
      log(store)
      return <i />
    }

    renderer.create(<Component />)

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenLastCalledWith([
      expect.objectContaining({
        fieldMap: expect.any(Map),
        valueMap: initialValueMap,
      }),
      expect.any(Function),
    ])
  })
})

describe("reducer", () => {
  it("returns current state by default", () => {
    const currentState = {}
    const action = { type: "a" }

    expect(reducer(currentState, action)).toBe(currentState)
  })
})

describe("reducer's `'set value'` case", () => {
  it("returns a new state object", () => {
    const type = "set value"
    const payload = {
      field: "a",
      nextValue: "b",
    }

    const nextState = reducer(initialState, { payload, type })

    expect(nextState).not.toBe(initialState)
  })

  it("sets `valueMap` to a new map", () => {
    const type = "set value"
    const payload = {
      field: "a",
      nextValue: "b",
    }

    const { valueMap } = reducer(initialState, { payload, type })

    expect(valueMap).not.toBe(initialState.valueMap)
  })

  it("sets `nextValue` in the new map", () => {
    const type = "set value"
    const payload = {
      field: "a",
      nextValue: "b",
    }

    const { valueMap } = reducer(initialState, { payload, type })
    const expected = simpleValueMap

    expect(valueMap).toEqual(expected)
  })

  it("preserves the rest of state", () => {
    const type = "set value"
    const payload = {
      field: "a",
      nextValue: "b",
    }

    const { fieldMap } = reducer(initialState, { payload, type })

    expect(fieldMap).toBe(initialState.fieldMap)
  })
})

describe("reducer's `'transform value'` case", () => {
  it("returns a new state object", () => {
    const initialState = { valueMap: simpleValueMap }
    const type = "transform value"
    const payload = {
      field: "a",
      transformValue: identity,
    }

    const nextState = reducer(initialState, { payload, type })

    expect(nextState).not.toBe(initialState)
  })

  it("sets `valueMap` to a new map", () => {
    const initialState = { valueMap: simpleValueMap }
    const type = "transform value"
    const payload = {
      field: "a",
      transformValue: identity,
    }

    const { valueMap } = reducer(initialState, { payload, type })

    expect(valueMap).not.toBe(initialState.valueMap)
  })

  it("calls `transformValue` with current value", () => {
    const initialState = { valueMap: simpleValueMap }
    const transformValue = jest.fn(toUpperCase)
    const type = "transform value"
    const payload = {
      field: "a",
      transformValue,
    }

    reducer(initialState, { payload, type })

    expect(transformValue).toHaveBeenCalledTimes(1)
    expect(transformValue).toHaveBeenLastCalledWith("b")
    expect(transformValue).toHaveNthReturnedWith(1, "B")
  })

  it("sets `nextValue` in the new map", () => {
    const initialState = { valueMap: simpleValueMap }
    const type = "transform value"
    const payload = {
      field: "a",
      transformValue: toUpperCase,
    }

    const { valueMap } = reducer(initialState, { payload, type })
    const expected = new Map(simpleValueMap).set("a", "B")

    expect(valueMap).toEqual(expected)
  })

  it("preserves the rest of state", () => {
    const initialState = { valueMap: simpleValueMap }
    const type = "transform value"
    const payload = {
      field: "a",
      transformValue: toUpperCase,
    }

    const { fieldMap } = reducer(initialState, { payload, type })

    expect(fieldMap).toBe(initialState.fieldMap)
  })
})

describe("reducer's `'reset state'` case", () => {
  it("returns a new state object", () => {
    const initialState = { valueMap: simpleValueMap }
    const payload = { initialValueMap: simpleValueMap }
    const type = "reset state"

    const nextState = reducer(initialState, { payload, type })

    expect(nextState).not.toBe(initialState)
  })

  it("sets `state.valueMap`", () => {
    const initialState = { valueMap: simpleValueMap }
    const payload = { initialValueMap: simpleValueMap }
    const type = "reset state"

    const { valueMap } = reducer(initialState, { payload, type })

    expect(valueMap).toBe(initialState.valueMap)
  })
})

describe("reducer's default case", () => {
  it("returns the current state object", () => {
    const initialState = { valueMap: simpleValueMap }
    const nextState = reducer(initialState)

    expect(nextState).toBe(initialState)
  })
})
