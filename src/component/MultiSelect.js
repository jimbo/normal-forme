import { createElement, useCallback } from "react"

import useMultipleSelection from "../selection/multiple"
import { createSet } from "../util/structures"

const pluckValue = ({ value }) => value

const MultiSelect = props => {
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
      multiple={true}
      onChange={handleChange}
      value={valueArray}
    />
  )
}

export default MultiSelect
