import { createElement, useCallback } from "react"

import useSingleSelection from "../selection/single"

const Select = props => {
  const { field, ...restProps } = props
  const { selectValue, selectedValue } = useSingleSelection(field)
  const value = selectedValue || ""

  const handleChange = useCallback(
    event => {
      selectValue(event.target.value)
    },
    [selectValue]
  )

  return (
    <select
      {...restProps}
      multiple={null}
      onChange={handleChange}
      value={value}
    />
  )
}

export default Select
