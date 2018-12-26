import { useCallback } from "react"

import { useFormContext } from "../context/form"

export default (field, value) => {
  const { transformValue, value: selectedValues } = useFormContext(field)
  const valueSet = selectedValues || new Set()
  const selected = valueSet.has(value)

  const selectValue = useCallback(
    (value, selected) => {
      transformValue((valueSet = new Set()) => {
        const nextValueSet = new Set(valueSet)

        if (selected) nextValueSet.add(value)
        else nextValueSet.delete(value)

        return nextValueSet
      })
    },
    [transformValue]
  )

  return {
    selectValue,
    selected,
    selectedValues,
  }
}
