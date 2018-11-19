import { createElement, useEffect } from "react"

import { FormProvider, useFormContext } from "../context/form"
import { useFormState } from "../state/form"

const Scope = props => {
  const { children, field } = props
  const { setValue, value } = useFormContext(field)
  const store = useFormState(value)
  const { valueMap } = store[0]
  const empty = !valueMap.size

  useEffect(() => {
    if (!empty && !Object.is(value, valueMap)) setValue(valueMap)
  })

  return <FormProvider value={store}>{children}</FormProvider>
}

export default Scope
