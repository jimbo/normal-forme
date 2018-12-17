import { createElement, useCallback } from "react"

import useSimpleSelection from "../selection/simple"

const Checkbox = props => {
  const { field, value, ...restProps } = props
  const { selectValue, selected } = useSimpleSelection(field, value)

  const handleChange = useCallback(
    event => {
      const { checked, value } = event.target

      selectValue(value, checked)
    },
    [selectValue]
  )

  return (
    <input
      {...restProps}
      checked={selected}
      onChange={handleChange}
      type="checkbox"
      value={value}
    />
  )
}

export default Checkbox
