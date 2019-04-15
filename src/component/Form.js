import { createElement, forwardRef, useCallback } from "react"

import { FormProvider } from "../context/form"
import { useFormState } from "../state/form"
import { createDeepMap } from "../util/structures"
import withDefaultProps from "../util/withDefaultProps"

export const useDefaultProps = withDefaultProps({
  onSubmit: () => {},
  preventDefault: true,
})

const Form = (props, ref) => {
  const allProps = useDefaultProps(props)
  const {
    children,
    initialValues,
    onSubmit,
    preventDefault,
    ...restProps
  } = allProps

  const initialValueMap = createDeepMap(initialValues)
  const store = useFormState(initialValueMap)
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
