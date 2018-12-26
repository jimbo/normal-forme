import { useFormContext } from "../context/form"

export default field => {
  const { setValue, value: selectedValues } = useFormContext(field)
  const valueSet = selectedValues || new Set()

  return {
    selectValues: setValue,
    selectedValues: valueSet,
  }
}
