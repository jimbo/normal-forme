import { createElement } from "react"

import useSimpleSelection from "../simple"
import { FormProvider } from "../../context/form"
import createTestInstance from "../../util/createTestInstance"

const field = "a"
const dispatch = jest.fn()
const getState = value => ({ valueMap: new Map().set(field, value) })

describe("useSimpleSelection", () => {
  it("returns the selected value and a callback", () => {
    let context
    const value = new Set().add("b").add("c")
    const state = getState(value)

    const Component = () => {
      context = useSimpleSelection(field)
      return <i />
    }

    createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Component />
      </FormProvider>
    )

    expect(context).toEqual(
      expect.objectContaining({
        selectValue: expect.any(Function),
        selected: false,
        selectedValues: value,
      })
    )
  })

  it("returns `selected: true` if `value` is selected", () => {
    let context
    const value = new Set().add("b").add("c")
    const state = getState(value)

    const Component = () => {
      context = useSimpleSelection(field, "b")
      return <i />
    }

    createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Component />
      </FormProvider>
    )

    expect(context.selected).toBe(true)
  })

  it("returns `selected: false` if `value` is unselected", () => {
    let context
    const value = new Set().add("b").add("c")
    const state = getState(value)

    const Component = () => {
      context = useSimpleSelection(field, "d")
      return <i />
    }

    createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Component />
      </FormProvider>
    )

    expect(context.selected).toBe(false)
  })
})

describe("useSimpleSelection's selectValue", () => {
  it("dispatches", () => {
    let selectValue
    const state = getState()
    const nextValue = "c"

    const Component = () => {
      const context = useSimpleSelection(field)
      selectValue = context.selectValue
      return <i />
    }

    createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Component />
      </FormProvider>
    )

    selectValue(nextValue)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenLastCalledWith({
      payload: { field, transformValue: expect.any(Function) },
      type: "transform value",
    })
  })
})
