import { createElement, useCallback } from "react"

import { useFormContext } from "../context/form"

const Radio = props => {
  const { field, value, ...restProps } = props
  const { setValue, value: selectedValue } = useFormContext(field)
  const checked = value === selectedValue

  const handleChange = useCallback(
    event => {
      setValue(event.target.value)
    },
    [setValue]
  )

  return (
    <input
      {...restProps}
      type="radio"
      checked={checked}
      value={value}
      onChange={handleChange}
    />
  )
}

export default Radio
