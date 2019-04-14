import { useReducer } from "react"

import { getDeepValue, setDeepValue } from "../util/deep"

export const init = (valueMap = new Map()) => ({ valueMap })

export const reducer = (state, action = {}) => {
  const { payload, type } = action

  switch (type) {
    case "set value": {
      const { valueMap } = state
      const { field, nextValue } = payload
      const nextValueMap = setDeepValue(valueMap, field, nextValue)

      return { valueMap: nextValueMap }
    }
    case "transform value": {
      const { valueMap } = state
      const { field, transformValue } = payload
      const currentValue = getDeepValue(valueMap, field)
      const nextValue = transformValue(currentValue)
      const nextValueMap = setDeepValue(valueMap, field, nextValue)

      return { valueMap: nextValueMap }
    }
    case "reset state": {
      const { valueMap } = payload

      return init(valueMap)
    }
    default: {
      return state
    }
  }
}

export const useFormState = valueMap => useReducer(reducer, valueMap, init)
