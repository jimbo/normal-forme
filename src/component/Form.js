import { createElement, useCallback } from "react"

import { FormProvider } from "../context/form"
import { useFormState } from "../state/form"
import withDefaultProps from "../util/withDefaultProps"

export const useDefaultProps = withDefaultProps({
  onSubmit: () => {},
  preventDefault: true,
})

const Form = props => {
  const { children, onSubmit, preventDefault } = useDefaultProps(props)
  const store = useFormState()
  const { valueMap } = store[0]

  const handleSubmit = useCallback(
    event => {
      if (!preventDefault) return
      event.preventDefault()
      onSubmit(valueMap)
    },
    [onSubmit, preventDefault, valueMap]
  )

  return (
    <form onSubmit={handleSubmit}>
      <FormProvider value={store}>{children}</FormProvider>
    </form>
  )
}

export default Form
