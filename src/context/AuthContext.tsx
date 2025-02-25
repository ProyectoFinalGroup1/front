'use client'
import { createContext, useContext, useState, useEffect } from "react"

export const AuthContext = createContext({
    userData: null,
    setUserData: () => {}
})

export const AuthProvider = ({ children }) => {
    // Estado con la info de usuario
    const [userData, setUserData] = useState();
    
    // Hook para guardar en localStorage
    useEffect(() => {
        if(userData) {
            localStorage.setItem("userSession", JSON.stringify({ token: userData.token, user: userData.user }))
        }
    }, [userData])

    // Hook para setear el Estado
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userSession")!)
        setUserData(userData)
    }, [])



    return (
        <AuthContext.Provider value>
            {children}
        </AuthContext.Provider>
    );
};