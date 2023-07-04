import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import {WorkoutsContextProvider} from './context/WorkoutContext.jsx'
import {AuthContextProvider} from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <WorkoutsContextProvider>
            <App />
        </WorkoutsContextProvider>
    </AuthContextProvider>
)
