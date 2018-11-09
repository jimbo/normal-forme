import { createElement } from "react"
import TestRenderer from "react-test-renderer"

import Select from "../Select"
import { FormProvider } from "../../context/form"

const field = "a"
const dispatch = jest.fn()
const getState = value => ({ valueMap: new Map().set(field, value) })

afterEach(() => {
  dispatch.mockClear()
})

describe("Select multiple={false}", () => {
  it("renders correctly", () => {
    const state = getState(new Set())
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Select field={field} />
      </FormProvider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
    expect(tree.props.multiple).toBeUndefined()
  })

  it("casts `undefined` value to empty string", () => {
    const state = getState()
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Select field={field} />
      </FormProvider>
    ).toJSON()

    expect(tree.props.value).toBe("")
  })

  it("casts `null` value to empty string", () => {
    const state = getState(null)
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Select field={field} />
      </FormProvider>
    ).toJSON()

    expect(tree.props.value).toBe("")
  })

  it("dispatches on change", () => {
    const state = getState(new Set().add("b"))
    const nextValue = new Set().add("c")
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Select field={field} />
      </FormProvider>
    ).toJSON()

    tree.props.onChange({
      target: { selectedOptions: Array.from(nextValue, value => ({ value })) },
    })

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenLastCalledWith({
      type: "set value",
      payload: { field, nextValue },
    })
  })

  it("memoizes its change handler", () => {
    const state = getState(new Set())
    const nextValue = "b"
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Select field={field} />
      </FormProvider>
    )

    const { onChange: handlerA } = tree.toJSON().props
    const nextState = getState(new Set().add(nextValue))

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

describe("Select multiple={true}", () => {
  it("renders correctly", () => {
    const state = getState(new Set())
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Select field={field} multiple />
      </FormProvider>
    ).toJSON()

    expect(tree).toMatchSnapshot()
    expect(tree.props.multiple).toBe(true)
  })

  it("casts `undefined` value to empty array", () => {
    const state = getState()
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Select field={field} multiple />
      </FormProvider>
    ).toJSON()

    expect(tree.props.value).toBeInstanceOf(Array)
    expect(tree.props.value).toHaveLength(0)
  })

  it("casts `null` value to empty array", () => {
    const state = getState(null)
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Select field={field} multiple />
      </FormProvider>
    ).toJSON()

    expect(tree.props.value).toBeInstanceOf(Array)
    expect(tree.props.value).toHaveLength(0)
  })

  it("dispatches on change", () => {
    const state = getState(new Set().add("b"))
    const nextValue = new Set().add("b").add("c")
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Select field={field} multiple />
      </FormProvider>
    ).toJSON()

    tree.props.onChange({
      target: { selectedOptions: Array.from(nextValue, value => ({ value })) },
    })

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenLastCalledWith({
      type: "set value",
      payload: { field, nextValue },
    })
  })

  it("memoizes its change handler", () => {
    const state = getState(new Set())
    const nextValue = new Set().add("b").add("c")
    const tree = TestRenderer.create(
      <FormProvider value={[state, dispatch]}>
        <Select field={field} multiple />
      </FormProvider>
    )

    const { onChange: handlerA } = tree.toJSON().props
    const nextState = getState(nextValue)

    tree.update(
      <FormProvider value={[nextState, dispatch]}>
        <Select field={field} multiple />
      </FormProvider>
    )

    const { onChange: handlerB } = tree.toJSON().props

    expect(handlerA).toBeInstanceOf(Function)
    expect(handlerB).toBeInstanceOf(Function)
    expect(handlerB).toBe(handlerA)
  })
})
