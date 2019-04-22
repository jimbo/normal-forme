import { createElement } from "react"

import Scope from "../Scope"
import { ScopeConsumer } from "../../context/scope"
import createTestInstance from "../../util/createTestInstance"
import { join } from "../../util/path"

const field = "a"
const nestedField = "b"

describe("Scope", () => {
  it("renders correctly", () => {
    const tree = createTestInstance(
      <Scope field={field}>
        <i />
      </Scope>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("provides a scope context", () => {
    let scopeValue

    createTestInstance(
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

    createTestInstance(
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
