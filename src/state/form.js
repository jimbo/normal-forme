import { useReducer } from "react"

import { getDeepValue, setDeepValue } from "../util/deep"

const initialValueMap = new Map()
const initialState = { valueMap: initialValueMap }

export const reducer = (state = initialState, action = {}) => {
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
    case "initialize values": {
      const { valueMap } = payload

      return { valueMap }
    }
    default: {
      return state
    }
  }
}

export const useFormState = (valueMap = initialValueMap) => {
  const initialAction = {
    type: "initialize values",
    payload: { valueMap },
  }

  return useReducer(reducer, initialState, initialAction)
}
