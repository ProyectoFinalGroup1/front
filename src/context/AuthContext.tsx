'use client'
import { IUserSession } from "@/types";
import { createContext, useContext, useState, useEffect } from "react"

// Interface
export interface AuthContextProps {
    userData: IUserSession | null,
    setUserData: (userData: IUserSession | null ) => void
}

export const AuthContext = createContext<AuthContextProps>({
    userData: null,
    setUserData: () => {}
})

// Interface
export interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // Estado con la info de usuario
    const [userData, setUserData] = useState<IUserSession | null>(null);
    
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
        <AuthContext.Provider value={{ userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};