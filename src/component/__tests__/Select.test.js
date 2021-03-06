import { createElement } from "react"

import Select from "../Select"
import { FormProvider } from "../../context/form"
import createTestInstance from "../../util/createTestInstance"

const field = "a"
const dispatch = jest.fn()
const getState = value => ({ valueMap: new Map().set(field, value) })

describe("Select", () => {
  it("renders correctly", () => {
    const state = getState()
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Select field={field} />
      </FormProvider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("casts `undefined` value to empty string", () => {
    const state = getState()
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Select field={field} />
      </FormProvider>
    ).toJSON()

    expect(tree.props.value).toBe("")
  })

  it("casts `null` value to empty string", () => {
    const state = getState(null)
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Select field={field} />
      </FormProvider>
    ).toJSON()

    expect(tree.props.value).toBe("")
  })

  it("dispatches on change", () => {
    const state = getState("b")
    const nextValue = "c"
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Select field={field} />
      </FormProvider>
    ).toJSON()

    tree.props.onChange({
      target: { value: nextValue },
    })

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenLastCalledWith({
      payload: { field, nextValue },
      type: "set value",
    })
  })

  it("memoizes its change handler", () => {
    const state = getState()
    const nextValue = "b"
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Select field={field} />
      </FormProvider>
    )

    const { onChange: handlerA } = tree.toJSON().props
    const nextState = getState(nextValue)

    tree.update(
      <FormProvider value={[nextState, dispatch]}>
        <Select field={field} />
      </FormProvider>
    )

    const { onChange: handlerB } = tree.toJSON().props

    expect(handlerA).toBeInstanceOf(Function)
    expect(handlerB).toBeInstanceOf(Function)
    expect(handlerB).toBe(handlerA)
  })
})
