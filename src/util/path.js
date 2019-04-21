export const split = path => /(\[\d+\])|\./[Symbol.split](path).filter(Boolean)

export const join = (...parts) =>
  parts.reduce((path, part) => {
    const prefix = path && part ? "." : ""
    return `${path}${prefix}${part}`
  }, "")
