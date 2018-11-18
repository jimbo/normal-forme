import { createElement, useCallback } from "react"

import { useFormContext } from "../context/form"

const TextArea = props => {
  const { field, ...restProps } = props
  const { setValue, value } = useFormContext(field)
  const stringValue = value == null ? "" : `${value}`

  const handleChange = useCallback(
    event => {
      setValue(event.target.value)
    },
    [setValue]
  )

  return <textarea {...restProps} value={stringValue} onChange={handleChange} />
}

export default TextArea
