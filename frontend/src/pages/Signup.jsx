import React, { useState } from 'react'
import {useSignup} from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {singup, isLoading, error} = useSignup()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        await singup(email, password)
    }

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label >Email : </label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label >Password : </label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Sign up</button>
            <a href="/login" className='login_redirect'><span>Already have an account?</span></a>
            {error && <div className='error'>{error}</div>}

        </form> 
    )
}

export default Signup