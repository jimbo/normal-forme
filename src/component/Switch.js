import { createElement, useCallback } from "react"

import { useFormContext } from "../context/form"

const Switch = props => {
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
      checked={checked}
      onChange={handleChange}
      type="checkbox"
    />
  )
}

export default Switch
