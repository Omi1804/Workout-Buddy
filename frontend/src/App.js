import React from "react"
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext"


//pages and components
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">

          <Routes>
            <Route path="/" 
              element={user ? <Home/> : <Navigate to='/login'/>}
            />

            <Route path="/login" 
              element={user ? <Navigate to='/'/> :<Login/>}
            />

            <Route path="/signup" 
              element={user ? <Navigate to='/'/> :<Signup/>}
            />

          </Routes>

        </div>
      </BrowserRouter>
      <footer>Developed by&nbsp;
        <a href="https://om-nigam.netlify.app" target="_blank" rel="noreferrer">
          &Oacute;m N&iacute;gam
        </a>
      </footer>
    </div>
  )
}

export default App
