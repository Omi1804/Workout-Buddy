import { createContext , useReducer , useEffect} from "react";

export const AuthContext = createContext()

export const authReducer = (state, action ) => {
    switch(action.type){
        case 'LOGIN':
            return { user: action.payload}
        case 'LOGOUT':
            return { user: null}
        default :
            return state
    }
}


export const AuthContextProvider = ({children})=> {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    //Initially checking in localstorage for the user's token whether he is already logedd in or not
    //now inspite of reloading the page if user hasn't logged out the page it will be logged in
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))

        if(user){
            dispatch({type: 'LOGIN', payload: user})
        }
    },[])

    console.log('AuthContext State :', state )

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}