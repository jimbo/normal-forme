import { createElement, useCallback } from "react"

import { useFormContext } from "../context/form"

const Checkbox = props => {
  const { field, value, ...restProps } = props
  const { transformValue, value: selectedValues } = useFormContext(field)
  const valueSet = selectedValues || new Set()
  const checked = valueSet.has(value)

  const handleChange = useCallback(
    event => {
      const { checked, value } = event.target

      transformValue((valueSet = new Set()) => {
        const nextValueSet = new Set(valueSet)

        if (checked) nextValueSet.add(value)
        else nextValueSet.delete(value)

        return nextValueSet
      })
    },
    [transformValue]
  )

  return (
    <input
      {...restProps}
      type="checkbox"
      checked={checked}
      value={value}
      onChange={handleChange}
    />
  )
}

export default Checkbox
