import { createElement } from "react"
import TestRenderer from "react-test-renderer"

import Switch from "../Switch"
import { FormProvider } from "../../context/form"

const field = "a"
const dispatch = jest.fn()
const getState = value => ({ valueMap: new Map().set(field, value) })

describe("Checkbox", () => {
  it("renders correctly", () => {
    const state = getState(true)
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Switch field={field} />
      </FormProvider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("renders if context value is undefined", () => {
    const state = getState()
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Switch field={field} />
      </FormProvider>
    )

    const input = tree.root.findByType("input")

    expect(input.props.checked).toBe(false)
  })

  it("renders if context value is null", () => {
    const state = getState(null)
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Switch field={field} />
      </FormProvider>
    )

    const input = tree.root.findByType("input")

    expect(input.props.checked).toBe(false)
  })

  it("sets `checked` to false if `value` is false", () => {
    const state = getState(false)
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Switch field={field} />
      </FormProvider>
    )

    const input = tree.root.findByType("input")

    expect(input.props.checked).toBe(false)
  })

  it("sets `checked` to true if `value` is true", () => {
    const state = getState(true)
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Switch field={field} />
      </FormProvider>
    )

    const input = tree.root.findByType("input")

    expect(input.props.checked).toBe(true)
  })

  it("dispatches on change", () => {
    const state = getState(false)
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Switch field={field} />
      </FormProvider>
    )

    const input = tree.root.findByType("input")

    input.props.onChange({
      target: { checked: true },
    })

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenLastCalledWith({
      payload: { field, nextValue: true },
      type: "set value",
    })
  })
})
