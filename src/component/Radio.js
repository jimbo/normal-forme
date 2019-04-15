import { createElement, forwardRef, useCallback } from "react"

import useSingleSelection from "../selection/single"

const Radio = (props, ref) => {
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
      ref={ref}
      checked={selected}
      onChange={handleChange}
      type="radio"
      value={value}
    />
  )
}

export default forwardRef(Radio)
