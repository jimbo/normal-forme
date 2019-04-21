import { createElement, forwardRef, useCallback } from "react"

import useMultipleSelection from "../selection/multiple"
import convertToString from "../util/convertToString"
import { createSet } from "../util/structures"

const pluckValue = ({ value }) => convertToString(value)

const MultiSelect = (props, ref) => {
  const { field, ...restProps } = props
  const { selectValues, selectedValues } = useMultipleSelection(field)
  const valueArray = Array.from(selectedValues)

  const handleChange = useCallback(
    event => {
      const { selectedOptions } = event.target
      const nextValueSet = createSet(selectedOptions, pluckValue)

      selectValues(nextValueSet)
    },
    [selectValues]
  )

  return (
    <select
      {...restProps}
      ref={ref}
      multiple={true}
      onChange={handleChange}
      value={valueArray}
    />
  )
}

export default forwardRef(MultiSelect)
