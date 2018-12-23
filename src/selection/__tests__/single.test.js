import { createElement } from "react"
import TestRenderer from "react-test-renderer"

import useSingleSelection from "../single"
import { FormProvider } from "../../context/form"

const field = "a"
const dispatch = jest.fn()
const getState = value => ({ valueMap: new Map().set(field, value) })

afterEach(() => {
  dispatch.mockClear()
})

describe("useSingleSelection", () => {
  it("returns the selected value and a callback", () => {
    let context
    const value = "b"
    const state = getState(value)

    const Component = () => {
      context = useSingleSelection(field)
      return <i />
    }

    TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Component />
      </FormProvider>
    )

    expect(context).toEqual(
      expect.objectContaining({
        selectValue: expect.any(Function),
        selected: false,
        selectedValue: value,
      })
    )
  })

  it("returns `selected: true` if `value` is selected", () => {
    let context
    const value = "b"
    const state = getState(value)

    const Component = () => {
      context = useSingleSelection(field, "b")
      return <i />
    }

    TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Component />
      </FormProvider>
    )

    expect(context.selected).toBe(true)
  })

  it("returns `selected: false` if `value` is unselected", () => {
    let context
    const value = "b"
    const state = getState(value)

    const Component = () => {
      context = useSingleSelection(field, "c")
      return <i />
    }

    TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Component />
      </FormProvider>
    )

    expect(context.selected).toBe(false)
  })
})

describe("useSingleSelection's selectValue", () => {
  it("dispatches", () => {
    let selectValue
    const state = getState()
    const nextValue = "c"

    const Component = () => {
      const context = useSingleSelection(field)
      selectValue = context.selectValue
      return <i />
    }

    TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Component />
      </FormProvider>
    )

    selectValue(nextValue)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenLastCalledWith({
      type: "set value",
      payload: { field, nextValue },
    })
  })
})