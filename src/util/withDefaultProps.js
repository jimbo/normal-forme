export default defaultProps => props => {
  const finalProps = { ...props }

  for (const [key, value] of Object.entries(defaultProps)) {
    if (props[key] === void 0) finalProps[key] = value
  }

  return finalProps
}
