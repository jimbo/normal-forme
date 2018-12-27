import { createElement } from "react"
import TestRenderer from "react-test-renderer"

import useMultipleSelection from "../multiple"
import { FormProvider } from "../../context/form"

const field = "a"
const log = jest.fn()
const dispatch = jest.fn()
const getState = value => ({ valueMap: new Map().set(field, value) })

describe("useMultipleSelection", () => {
  it("returns the selected values and a callback", () => {
    const value = new Set().add("b").add("c")
    const state = getState(value)

    const Component = () => {
      const context = useMultipleSelection(field)
      log(context)
      return <i />
    }

    TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Component />
      </FormProvider>
    )

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenLastCalledWith(
      expect.objectContaining({
        selectValues: expect.any(Function),
        selectedValues: value,
      })
    )
  })
})

describe("useMultipleSelection's selectValues", () => {
  it("dispatches", () => {
    let selectValues
    const state = getState()
    const nextValue = new Set().add("c").add("d")

    const Component = () => {
      const context = useMultipleSelection(field)
      selectValues = context.selectValues
      return <i />
    }

    TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Component />
      </FormProvider>
    )

    selectValues(nextValue)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenLastCalledWith({
      payload: { field, nextValue },
      type: "set value",
    })
  })
})
