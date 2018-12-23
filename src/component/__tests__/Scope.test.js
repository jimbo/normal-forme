import { createElement } from "react"
import TestRenderer from "react-test-renderer"

import Scope from "../Scope"
import { ScopeConsumer } from "../../context/scope"
import { join } from "../../util/deep"

const field = "a"
const nestedField = "b"

describe("Scope", () => {
  it("renders correctly", () => {
    const tree = TestRenderer.create(
      <Scope field={field}>
        <i />
      </Scope>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("provides a scope context", () => {
    let scopeValue

    TestRenderer.create(
      <Scope field={field}>
        <ScopeConsumer>
          {contextValue => {
            scopeValue = contextValue
            return null
          }}
        </ScopeConsumer>
      </Scope>
    )

    expect(scopeValue).toBe(field)
  })

  it("supports nested scopes", () => {
    let scopeValue

    TestRenderer.create(
      <Scope field={field}>
        <Scope field={nestedField}>
          <ScopeConsumer>
            {contextValue => {
              scopeValue = contextValue
              return null
            }}
          </ScopeConsumer>
        </Scope>
      </Scope>
    )

    expect(scopeValue).toBe(join(field, nestedField))
  })
})
