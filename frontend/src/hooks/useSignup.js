import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import publicRequest from '../requestMethod'

//creating custom signup hook

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()


    const singup = async (email, password) => {
        setIsLoading(true)
        setError(null)


        //post request
        try {
            const response = await publicRequest.post('/user/signup',
             JSON.stringify({ email, password }), 
            {
                headers: { 'Content-Type': 'application/json' },
            })


            const json = await response.data;
            
            console.log(json)

            if (response.status !== 200) {
                setIsLoading(false)
                setError(json.error)
            }
            else{
                //saving the user to local storage
                localStorage.setItem('user', JSON.stringify(json))

                //update the auth context
                dispatch({ type: 'LOGIN', payload: json })

                setIsLoading(false)
            }
        } catch (err) {
            setIsLoading(false)
            setError(err.response.data.error)
        }
    }
    return { singup, isLoading, error }
}