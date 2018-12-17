import { createElement } from "react"

import { useFormContext } from "../context/form"

export default (field, value) => {
  const { setValue, value: selectedValue } = useFormContext(field)
  const selected = value === selectedValue

  return {
    selectValue: setValue,
    selected,
    selectedValue,
  }
}
