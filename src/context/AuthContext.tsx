"use client"
import { createContext, useContext, useState, useEffect } from "react"
import type React from "react"

import { supabase, checkAndCreateUser } from "@/lib/supabase"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"


// Ensure IUserSession matches our DbUser structure
export interface IUserSession {
  token: string;
  user: {
    email: string;
    nombre: string;
    apellido: string;
    idUser: string;
    dni: string | number;
    isAdmin: boolean;
 
    fechaPago: string | null;
    imagenUrl: string | null;
    recibirRecordatoriosAniversarios: boolean;
  };
}

export interface AuthContextProps {
  userData: IUserSession | null
  setUserData: (userData: IUserSession | null) => void
  isAuthenticated: boolean
  logout: () => void
  signInWithGoogle: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>({
  userData: null,
  setUserData: () => {},
  isAuthenticated: false,
  logout: () => {},
  signInWithGoogle: async () => {},
})

export interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<IUserSession | null>(null)
  const isAuthenticated = !!userData?.token
  const router = useRouter()

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userSession", JSON.stringify({ token: userData.token, user: userData.user }))
      Cookies.set("userData", JSON.stringify(userData))
    }
  }, [userData])

  useEffect(() => {
    const storedUserData = localStorage.getItem("userSession")
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData)
      setUserData(parsedUserData)
    } else {
      const initializeAuth = async () => {
        try {
          const {
            data: { session },
          } = await supabase.auth.getSession()

          if (session) {
            try {
              // Check if user exists in custom table and create if not
              const dbUser = await checkAndCreateUser(session.user)
              console.log("User check/create completed in AuthContext:", dbUser)

              const userInfo: IUserSession = {
                token: session.access_token,
                user: {
                  email: dbUser.email || "",
                  nombre: dbUser.nombre || "",
                  apellido: dbUser.apellido || "",
                  idUser: dbUser.idUser,
                  dni: dbUser.dni || 0,
                  isAdmin: dbUser.isAdmin || false,
           
                  fechaPago: dbUser.fechaPago || null,
                  imagenUrl: dbUser.imagenUrl || null,
                  recibirRecordatoriosAniversarios: dbUser.recibirRecordatoriosAniversarios || true,
                },
              };
              
              setUserData(userInfo)
              Cookies.set("userData", JSON.stringify(userInfo))
            } catch (error) {
              console.error("Error checking/creating user in initializeAuth:", error)
            }
          }
        } catch (error) {
          console.error("Error in initializeAuth:", error)
        }
      }

      initializeAuth()
    }
  }, [])

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event)

      if (event === "SIGNED_IN" && session) {
        try {
          // Check if user exists in custom table and create if not
          const dbUser = await checkAndCreateUser(session.user)
          console.log("User check/create completed in onAuthStateChange:", dbUser)

          const userInfo: IUserSession = {
            token: session.access_token,
            user: {
              email: dbUser.email || "",
              nombre: dbUser.nombre || "",
              apellido: dbUser.apellido || "",
              idUser: dbUser.idUser,
              dni: dbUser.dni || 0,
              isAdmin: dbUser.isAdmin || false,
           
              fechaPago: dbUser.fechaPago || null,
              imagenUrl: dbUser.imagenUrl || null,
              recibirRecordatoriosAniversarios: dbUser.recibirRecordatoriosAniversarios || true,
            },
          };

          setUserData(userInfo)
          Cookies.set("userData", JSON.stringify(userInfo))

          // Don't redirect here - let the callback page handle it
        } catch (error) {
          console.error("Error checking/creating user in onAuthStateChange:", error)
        }
      }

      if (event === "SIGNED_OUT") {
        setUserData(null)
        Cookies.remove("userData")
        router.push("/login")
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const logout = async () => {
    await supabase.auth.signOut()
    setUserData(null)
    Cookies.remove("userData", { path: "" })
    localStorage.removeItem("sb-wbdarmsigbqzvkvcezkt-auth-token")
    localStorage.removeItem("userSession")
    router.push("/login")
  }

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback/google`,
        },
      })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error("Error signing in with Google:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        isAuthenticated,
        logout,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
