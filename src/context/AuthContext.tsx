'use client'
import { createContext, useContext, useState, useEffect } from "react"

export const AuthContext = createContext({
    userData: null,
    setUserData: () => {}
})

export const AuthProvider = ({ children }) => {

    return (
        <AuthContext.Provider value>
            {children}
        </AuthContext.Provider>
    );
};