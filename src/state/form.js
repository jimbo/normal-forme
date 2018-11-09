import { useReducer } from "react"

import { getDeepValue, setDeepValue } from "../util/deep"

const getInitialState = (initialValueMap = new Map()) => ({
  valueMap: initialValueMap,
})

export const reducer = (state = getInitialState(), { payload, type } = {}) => {
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
    default: {
      return state
    }
  }
}

export const useFormState = initialValueMap =>
  useReducer(reducer, getInitialState(initialValueMap))
