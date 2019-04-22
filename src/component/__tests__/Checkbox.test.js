import { createElement } from "react"

import Checkbox from "../Checkbox"
import { FormProvider } from "../../context/form"
import createTestInstance from "../../util/createTestInstance"

const field = "a"
const dispatch = jest.fn()
const getState = value => ({ valueMap: new Map().set(field, value) })

describe("Checkbox", () => {
  it("renders correctly", () => {
    const state = getState(new Set().add("b"))
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Checkbox field={field} value="b" />
        <Checkbox field={field} value="c" />
        <Checkbox field={field} value="d" />
      </FormProvider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("sets `checked` to `true` if the value matches", () => {
    const selectedValues = new Set().add("c").add("d")
    const state = getState(selectedValues)
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Checkbox field={field} value="b" />
        <Checkbox field={field} value="c" />
        <Checkbox field={field} value="d" />
      </FormProvider>
    ).toJSON()

    for (const element of tree) {
      const { checked, value } = element.props
      expect(checked).toBe(selectedValues.has(value))
    }
  })

  it("renders if context value is `undefined`", () => {
    const state = getState()
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Checkbox field={field} value="b" />
        <Checkbox field={field} value="c" />
        <Checkbox field={field} value="d" />
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
        <Checkbox field={field} value="b" />
        <Checkbox field={field} value="c" />
        <Checkbox field={field} value="d" />
      </FormProvider>
    ).toJSON()

    for (const element of tree) {
      expect(element.props.checked).toBe(false)
    }
  })

  it("dispatches on change", () => {
    const valueToAppend = "d"
    const state = getState(new Set().add("b"))
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Checkbox field={field} value="b" />
        <Checkbox field={field} value="c" />
        <Checkbox field={field} value="d" />
      </FormProvider>
    ).toJSON()

    const nextElement = tree.find(({ props }) => props.value === valueToAppend)
    nextElement.props.onChange({
      target: { checked: true, value: valueToAppend },
    })

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenLastCalledWith({
      payload: { field, transformValue: expect.any(Function) },
      type: "transform value",
    })
  })
})

describe("Checkbox's transformValue", () => {
  it("includes a checked value in the value set", () => {
    const valueToAppend = "d"
    const state = getState(new Set().add("b"))
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Checkbox field={field} value="b" />
        <Checkbox field={field} value="c" />
        <Checkbox field={field} value="d" />
      </FormProvider>
    ).toJSON()

    const nextElement = tree.find(({ props }) => props.value === valueToAppend)
    nextElement.props.onChange({
      target: { checked: true, value: valueToAppend },
    })

    const { transformValue } = dispatch.mock.calls[0][0].payload
    const valueSet = state.valueMap.get(field)
    const result = transformValue(valueSet)

    expect(result).toEqual(new Set(valueSet).add(valueToAppend))
  })

  it("removes an unchecked value from the value set", () => {
    const valueToRemove = "d"
    const state = getState(new Set().add("c").add("d"))
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Checkbox field={field} value="b" />
        <Checkbox field={field} value="c" />
        <Checkbox field={field} value="d" />
      </FormProvider>
    ).toJSON()

    const nextElement = tree.find(({ props }) => props.value === valueToRemove)
    nextElement.props.onChange({
      target: { checked: false, value: valueToRemove },
    })

    const { transformValue } = dispatch.mock.calls[0][0].payload
    const valueSet = state.valueMap.get(field)
    const result = transformValue(valueSet)
    const expected = new Set(valueSet)

    expected.delete(valueToRemove)
    expect(result).toEqual(expected)
  })

  it("creates a new value set if it's undefined", () => {
    const valueToAppend = "d"
    const state = getState()
    const tree = createTestInstance(
      <FormProvider value={[state, dispatch]}>
        <Checkbox field={field} value="b" />
        <Checkbox field={field} value="c" />
        <Checkbox field={field} value="d" />
      </FormProvider>
    ).toJSON()

    const nextElement = tree.find(({ props }) => props.value === valueToAppend)
    nextElement.props.onChange({
      target: { checked: true, value: valueToAppend },
    })

    const { transformValue } = dispatch.mock.calls[0][0].payload
    const result = transformValue()

    expect(result).toEqual(new Set().add(valueToAppend))
  })
})
