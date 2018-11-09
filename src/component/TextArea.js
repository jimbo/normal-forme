import { createElement, useCallback } from "react"

import { useFormContext } from "../context/form"

const TextArea = ({ field }) => {
  const { setValue, value } = useFormContext(field)
  const stringValue = value == null ? "" : `${value}`

  const handleChange = useCallback(
    event => {
      setValue(event.target.value)
    },
    [setValue]
  )

  return <textarea value={stringValue} onChange={handleChange} />
}

export default TextArea
