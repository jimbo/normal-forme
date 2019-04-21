import { createElement, forwardRef, useCallback } from "react"

import { useFormContext } from "../context/form"
import convertToString from "../util/convertToString"
import withDefaultProps from "../util/withDefaultProps"

const useDefaultProps = withDefaultProps({
  type: "text",
})

const Text = (props, ref) => {
  const { field, ...restProps } = useDefaultProps(props)
  const { setValue, value } = useFormContext(field)
  const stringValue = convertToString(value)

  const handleChange = useCallback(
    event => {
      setValue(event.target.value)
    },
    [setValue]
  )

  return (
    <input
      {...restProps}
      ref={ref}
      onChange={handleChange}
      value={stringValue}
    />
  )
}

export default forwardRef(Text)
