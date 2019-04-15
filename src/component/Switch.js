import { createElement, forwardRef, useCallback } from "react"

import { useFormContext } from "../context/form"

const Switch = (props, ref) => {
  const { field, ...restProps } = props
  const { setValue, value } = useFormContext(field)
  const checked = !!value

  const handleChange = useCallback(
    event => {
      setValue(event.target.checked)
    },
    [setValue]
  )

  return (
    <input
      {...restProps}
      ref={ref}
      checked={checked}
      onChange={handleChange}
      type="checkbox"
    />
  )
}

export default forwardRef(Switch)
