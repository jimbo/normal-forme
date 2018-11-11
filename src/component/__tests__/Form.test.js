import { createElement, useContext } from "react"
import TestRenderer from "react-test-renderer"

import Form, { useDefaultProps } from "../Form"
import { FormConsumer } from "../../context/form"

const log = jest.fn()
const preventDefault = jest.fn()

afterEach(() => {
  log.mockClear()
  preventDefault.mockClear()
})

describe("Form", () => {
  it("renders correctly", () => {
    const tree = TestRenderer.create(<Form />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(tree.props.onSubmit).toBeInstanceOf(Function)
  })

  it("provides a store", () => {
    TestRenderer.create(
      <Form>
        <FormConsumer>{store => log(store) || null}</FormConsumer>
      </Form>
    ).toJSON()

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenLastCalledWith([
      expect.objectContaining({ valueMap: new Map() }),
      expect.any(Function),
    ])
  })

  it("prevents default and calls `onSubmit` with state values", () => {
    const tree = TestRenderer.create(<Form onSubmit={log} />).toJSON()

    tree.props.onSubmit({ preventDefault })

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenLastCalledWith(expect.any(Map))
    expect(preventDefault).toHaveBeenCalledTimes(1)
  })

  it("doesn't prevent or call if `preventDefault` is `false`", () => {
    const tree = TestRenderer.create(
      <Form preventDefault={false} onSubmit={log} />
    ).toJSON()

    const result = tree.props.onSubmit({ preventDefault })

    expect(result).toBeUndefined()
    expect(log).toHaveBeenCalledTimes(0)
    expect(preventDefault).toHaveBeenCalledTimes(0)
  })

  it("memoizes its submit handler", () => {
    const tree = TestRenderer.create(<Form onSubmit={log} />)
    const { onSubmit: handlerA } = tree.toJSON().props

    tree.update(<Form onSubmit={log} />)
    const { onSubmit: handlerB } = tree.toJSON().props

    expect(handlerA).toBeInstanceOf(Function)
    expect(handlerB).toBeInstanceOf(Function)
    expect(handlerB).toBe(handlerA)
  })
})

describe("useDefaultProps", () => {
  it("defaults `onSubmit` to a noop function", () => {
    const props = useDefaultProps({})

    expect(props).toHaveProperty("onSubmit", expect.any(Function))
    expect(props.onSubmit({ preventDefault })).toBeUndefined()
  })

  it("defaults `preventDefault` to `true`", () => {
    const props = useDefaultProps({})

    expect(props).toHaveProperty("preventDefault", true)
  })

  it("preserves other props", () => {
    const props = {
      customProp: null,
      onSubmit: log,
      preventDefault: false,
    }

    expect(useDefaultProps(props)).toMatchObject(props)
  })
})
