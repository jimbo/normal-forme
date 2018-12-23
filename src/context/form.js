import { createContext, useCallback, useContext } from "react"

import ScopeContext from "../context/scope"
import { getDeepValue, join } from "../util/deep"

const FormContext = createContext()
const { Consumer, Provider } = FormContext

export default FormContext
export { Consumer as FormConsumer }
export { Provider as FormProvider }

export const useFormContext = field => {
  const scope = useContext(ScopeContext)
  const scopedField = join(scope, field)
  const [state, dispatch] = useContext(FormContext)
  const value = getDeepValue(state.valueMap, scopedField)

  const setValue = useCallback(
    nextValue =>
      dispatch({
        type: "set value",
        payload: { field: scopedField, nextValue },
      }),
    [dispatch, scopedField]
  )

  const transformValue = useCallback(
    transformValue =>
      dispatch({
        type: "transform value",
        payload: { field: scopedField, transformValue },
      }),
    [dispatch, scopedField]
  )

  return { setValue, transformValue, value }
}
