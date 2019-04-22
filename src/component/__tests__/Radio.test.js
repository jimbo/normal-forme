import { createElement } from "react"

import Radio from "../Radio"
import { FormProvider } from "../../context/form"
import createTestInstance from "../../util/createTestInstance"

const field = "a"
const dispatch = jest.fn()
const getState = value => ({ valueMap: new Map().set(field, value) })

describe("Radio", () => {
  it("renders correctly", () => {
    const state = getState("b")
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Radio field={field} value="b" />
        <Radio field={field} value="c" />
        <Radio field={field} value="d" />
      </FormProvider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("sets `checked` to `true` if the value matches", () => {
    const selectedValue = "c"
    const state = getState(selectedValue)
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Radio field={field} value="b" />
        <Radio field={field} value="c" />
        <Radio field={field} value="d" />
      </FormProvider>
    ).toJSON()

    for (const element of tree) {
      const { checked, value } = element.props
      expect(checked).toBe(value === selectedValue)
    }
  })

  it("renders if context value is `undefined`", () => {
    const state = getState()
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Radio field={field} value="b" />
        <Radio field={field} value="c" />
        <Radio field={field} value="d" />
      </FormProvider>
    ).toJSON()

    for (const element of tree) {
      expect(element.props.checked).toBe(false)
    }
  })

  it("renders if context value is `null`", () => {
    const state = getState(null)
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Radio field={field} value="b" />
        <Radio field={field} value="c" />
        <Radio field={field} value="d" />
      </FormProvider>
    ).toJSON()

    for (const element of tree) {
      expect(element.props.checked).toBe(false)
    }
  })

  it("dispatches on change", () => {
    const state = getState("b")
    const nextValue = "c"
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Radio field={field} value="b" />
        <Radio field={field} value="c" />
        <Radio field={field} value="d" />
      </FormProvider>
    ).toJSON()

    const nextElement = tree.find(({ props }) => props.value === nextValue)
    nextElement.props.onChange({ target: { value: nextValue } })

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenLastCalledWith({
      payload: { field, nextValue },
      type: "set value",
    })
  })
})
