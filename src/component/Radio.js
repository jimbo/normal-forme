import { createElement, useCallback } from "react"

import useSingleSelection from "../selection/single"

const Radio = props => {
  const { field, value, ...restProps } = props
  const { selectValue, selected } = useSingleSelection(field, value)

  const handleChange = useCallback(
    event => {
      selectValue(event.target.value)
    },
    [selectValue]
  )

  return (
    <input
      {...restProps}
      checked={selected}
      onChange={handleChange}
      type="radio"
      value={value}
    />
  )
}

export default Radio
