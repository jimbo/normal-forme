import { createContext } from "react"

const ScopeContext = createContext("")
const { Consumer, Provider } = ScopeContext

export default ScopeContext
export { Consumer as ScopeConsumer }
export { Provider as ScopeProvider }
