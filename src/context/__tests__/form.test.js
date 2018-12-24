import { createElement } from "react"
import TestRenderer from "react-test-renderer"

import FormContext, { FormProvider, useFormContext } from "../form"

const log = jest.fn()
const dispatch = jest.fn()
const state = { valueMap: new Map().set("a", "b") }

describe("module", () => {
  it("exports `FormContext` and `FormProvider`", () => {
    expect(FormProvider).toBe(FormContext.Provider)
  })
})

describe("useFormContext", () => {
  it("returns the field value and action creators", () => {
    const Component = () => {
      const context = useFormContext("a")
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
        setValue: expect.any(Function),
        transformValue: expect.any(Function),
        value: "b",
      })
    )
  })
})

describe("useFormContext's setValue", () => {
  it("dispatches a `'set value'` action", () => {
    let setValue
    const field = "a"
    const nextValue = "c"

    const Component = () => {
      const context = useFormContext(field)
      setValue = context.setValue
      return <i />
    }

    TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Component />
      </FormProvider>
    )

    setValue(nextValue)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenLastCalledWith({
      type: "set value",
      payload: { field, nextValue },
    })
  })
})

describe("useFormContext's transformValue", () => {
  it("dispatches a `'transform value'` action", () => {
    let transformValue
    const field = "a"
    const transform = jest.fn()

    const Component = () => {
      const context = useFormContext(field)
      transformValue = context.transformValue
      return <i />
    }

    TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Component />
      </FormProvider>
    )

    transformValue(transform)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenLastCalledWith({
      type: "transform value",
      payload: { field, transformValue: transform },
    })
  })
})
