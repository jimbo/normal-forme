import { createContext, useCallback, useContext } from "react"

import { getDeepValue } from "../util/deep"

const FormContext = createContext()
const { Consumer, Provider } = FormContext

export default FormContext
export { Consumer as FormConsumer }
export { Provider as FormProvider }

export const useFormContext = field => {
  const [state, dispatch] = useContext(FormContext)
  const value = getDeepValue(state.valueMap, field)

  const setValue = useCallback(
    nextValue => dispatch({ type: "set value", payload: { field, nextValue } }),
    [dispatch, field]
  )

  const transformValue = useCallback(
    transformValue =>
      dispatch({ type: "transform value", payload: { field, transformValue } }),
    [dispatch, field]
  )

  return { setValue, transformValue, value }
}
