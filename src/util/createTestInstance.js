import TestRenderer, { act } from "react-test-renderer"

export default (...args) => {
  let instance

  act(() => {
    instance = TestRenderer.create(...args)
  })

  return instance
}
