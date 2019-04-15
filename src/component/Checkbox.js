import { createElement, forwardRef, useCallback } from "react"

import useSimpleSelection from "../selection/simple"

const Checkbox = (props, ref) => {
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
      ref={ref}
      checked={selected}
      onChange={handleChange}
      type="checkbox"
      value={value}
    />
  )
}

export default forwardRef(Checkbox)
