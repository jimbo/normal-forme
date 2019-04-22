import { createElement, forwardRef, useCallback } from "react"

import { FormProvider } from "../context/form"
import { useFormState } from "../state/form"
import { createMap } from "../util/structures"
import withDefaultProps from "../util/withDefaultProps"

export const useDefaultProps = withDefaultProps({
  onSubmit: () => {},
  preventDefault: true,
})

const Form = (props, ref) => {
  const allProps = useDefaultProps(props)
  const {
    children,
    initialFields,
    initialValues,
    onSubmit,
    preventDefault,
    ...restProps
  } = allProps

  const initialFieldMap = createMap(initialFields || "")
  const initialValueMap = createMap(initialValues || "")
  const store = useFormState({ initialFieldMap, initialValueMap })
  const [{ valueMap }] = store

  const handleSubmit = useCallback(
    event => {
      if (!preventDefault) return
      event.preventDefault()
      onSubmit(valueMap)
    },
    [onSubmit, preventDefault, valueMap]
  )

  return (
    <form {...restProps} ref={ref} onSubmit={handleSubmit}>
      <FormProvider value={store}>{children}</FormProvider>
    </form>
  )
}

export default forwardRef(Form)
