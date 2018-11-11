import { createElement, useCallback } from "react"

import { useFormContext } from "../context/form"

const Radio = ({ field, value }) => {
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
      type="radio"
      checked={checked}
      value={value}
      onChange={handleChange}
    />
  )
}

export default Radio
