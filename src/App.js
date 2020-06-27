import React, { useContext, useEffect } from "react"
import { UserContext } from "./context/UserContext"
import Header from './Components/Header'
import routes from './routes'

function App() {
  const {getUser} = useContext(UserContext)
  useEffect(() => {
    getUser()
  }, [])
  return (
    <div>
      <Header />
      {routes}
    </div>
  )
}

export default App
