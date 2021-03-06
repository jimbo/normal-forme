import { createElement } from "react"

import MultiSelect from "../MultiSelect"
import { FormProvider } from "../../context/form"
import createTestInstance from "../../util/createTestInstance"

const field = "a"
const dispatch = jest.fn()
const getState = value => ({ valueMap: new Map().set(field, value) })

describe("MultiSelect", () => {
  it("renders correctly", () => {
    const state = getState()
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <MultiSelect field={field} />
      </FormProvider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
    expect(tree.props.multiple).toBe(true)
  })

  it("casts `undefined` value to empty array", () => {
    const state = getState()
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <MultiSelect field={field} />
      </FormProvider>
    ).toJSON()

    expect(tree.props.value).toBeInstanceOf(Array)
    expect(tree.props.value).toHaveLength(0)
  })

  it("casts `null` value to empty array", () => {
    const state = getState(null)
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <MultiSelect field={field} />
      </FormProvider>
    ).toJSON()

    expect(tree.props.value).toBeInstanceOf(Array)
    expect(tree.props.value).toHaveLength(0)
  })

  it("dispatches on change", () => {
    const state = getState(new Set().add("b"))
    const nextValue = new Set().add("b").add("c")
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <MultiSelect field={field} />
      </FormProvider>
    ).toJSON()

    tree.props.onChange({
      target: { selectedOptions: Array.from(nextValue, value => ({ value })) },
    })

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenLastCalledWith({
      payload: { field, nextValue },
      type: "set value",
    })
  })

  it("memoizes its change handler", () => {
    const state = getState(new Set())
    const nextValue = new Set().add("b").add("c")
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <MultiSelect field={field} />
      </FormProvider>
    )

    const { onChange: handlerA } = tree.toJSON().props
    const nextState = getState(nextValue)

    tree.update(
      <FormProvider value={[nextState, dispatch]}>
        <MultiSelect field={field} />
      </FormProvider>
    )

    const { onChange: handlerB } = tree.toJSON().props

    expect(handlerA).toBeInstanceOf(Function)
    expect(handlerB).toBeInstanceOf(Function)
    expect(handlerB).toBe(handlerA)
  })
})
