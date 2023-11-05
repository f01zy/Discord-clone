import ReactDOM from 'react-dom/client'
import Store from './store'
import "./scss/base.scss"
import { createContext } from 'react'
import App from './App'

interface State {
  store: Store
}

const store = new Store()

export const Context = createContext<State>({
  store
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Context.Provider value={{store}}>
    <App />
  </Context.Provider>
)
