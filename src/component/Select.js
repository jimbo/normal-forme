import { createElement, useCallback } from "react"

import { useFormContext } from "../context/form"
import { createSet } from "../util/structures"

const pluckValue = ({ value }) => value

const Select = props => {
  const { field, multiple, ...restProps } = props
  const { setValue, value: selectedValues } = useFormContext(field)
  const valueArray = Array.from(selectedValues || "")
  const value = multiple ? valueArray : valueArray.shift() || ""

  const handleChange = useCallback(
    event => {
      const { selectedOptions } = event.target
      const nextValueSet = createSet(selectedOptions, pluckValue)

      setValue(nextValueSet)
    },
    [setValue]
  )

  return (
    <select
      {...restProps}
      multiple={multiple}
      value={value}
      onChange={handleChange}
    />
  )
}

export default Select
