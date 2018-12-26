import { createElement, useCallback } from "react"

import { useFormContext } from "../context/form"
import withDefaultProps from "../util/withDefaultProps"

const useDefaultProps = withDefaultProps({
  type: "text",
})

const Text = props => {
  const { field, ...restProps } = useDefaultProps(props)
  const { setValue, value } = useFormContext(field)
  const stringValue = value == null ? "" : `${value}`

  const handleChange = useCallback(
    event => {
      setValue(event.target.value)
    },
    [setValue]
  )

  return <input {...restProps} onChange={handleChange} value={stringValue} />
}

export default Text
