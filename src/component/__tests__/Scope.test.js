import { createElement, useContext } from "react"
import TestRenderer from "react-test-renderer"

import Scope from "../Scope"
import Text from "../Text"
import { FormProvider } from "../../context/form"

const field = "a"
const nestedField = "b"
const dispatch = jest.fn()
const getState = value => ({ valueMap: new Map().set(field, value) })

afterEach(() => {
  dispatch.mockClear()
})

describe("Scope", () => {
  it("renders correctly", () => {
    const state = getState()
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Scope field={field} />
      </FormProvider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("provides a new form context", () => {
    const state = getState(new Map().set("b", "c"))
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Scope field={field}>
          <Text field={nestedField} />
        </Scope>
      </FormProvider>
    ).toJSON()

    expect(tree.props.value).toBe("c")
  })

  it("dispatches if state value differs from context value", () => {
    const state = getState(new Map().set("b", "c"))
    const store = [state, dispatch]
    const tree = TestRenderer.create(
      <FormProvider value={store}>
        <Scope field={field}>
          <Text field={nestedField} />
        </Scope>
      </FormProvider>
    )

    tree.toJSON().props.onChange({ target: { value: "d" } })

    tree.update(
      <FormProvider value={store}>
        <Scope field={field}>
          <Text field={nestedField} />
        </Scope>
      </FormProvider>
    )

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenLastCalledWith({
      type: "set value",
      payload: { field: "a", nextValue: new Map().set("b", "d") },
    })
  })
})
