import { useReducer } from "react"

export const init = (initialState = {}) => {
  const { initialFieldMap, initialValueMap } = initialState
  const fieldMap = initialFieldMap || new Map()
  const valueMap = initialValueMap || new Map()

  return { fieldMap, valueMap }
}

export const reducer = (state, action = {}) => {
  const { payload, type } = action

  switch (type) {
    case "set value": {
      const { valueMap } = state
      const { field, nextValue } = payload
      const nextValueMap = new Map(valueMap).set(field, nextValue)

      return { ...state, valueMap: nextValueMap }
    }
    case "transform value": {
      const { valueMap } = state
      const { field, transformValue } = payload
      const currentValue = valueMap.get(field)
      const nextValue = transformValue(currentValue)
      const nextValueMap = new Map(valueMap).set(field, nextValue)

      return { ...state, valueMap: nextValueMap }
    }
    case "reset state": {
      return init(payload)
    }
    default: {
      return state
    }
  }
}

export const useFormState = initialState =>
  useReducer(reducer, initialState, init)
