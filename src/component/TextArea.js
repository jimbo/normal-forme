import { createElement, forwardRef, useCallback } from "react"

import { useFormContext } from "../context/form"
import convertToString from "../util/convertToString"

const TextArea = (props, ref) => {
  const { field, ...restProps } = props
  const { setValue, value } = useFormContext(field)
  const stringValue = convertToString(value)

  const handleChange = useCallback(
    event => {
      setValue(event.target.value)
    },
    [setValue]
  )

  return (
    <textarea
      {...restProps}
      ref={ref}
      onChange={handleChange}
      value={stringValue}
    />
  )
}

export default forwardRef(TextArea)
