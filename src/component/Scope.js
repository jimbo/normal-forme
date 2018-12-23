import { createElement, useContext } from "react"

import ScopeContext, { ScopeProvider } from "../context/scope"
import { join } from "../util/deep"

const Scope = props => {
  const { children, field } = props
  const scope = useContext(ScopeContext)
  const scopedField = join(scope, field)

  return <ScopeProvider value={scopedField}>{children}</ScopeProvider>
}

export default Scope
