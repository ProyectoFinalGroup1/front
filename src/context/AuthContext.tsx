"use client"
import { createContext, useContext, useState, useEffect } from "react"
import type React from "react"

import { supabase, checkAndCreateUser } from "@/lib/supabase"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

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
    provider?: string;
    phoneNumber: number;
    password: string;
  };
}

export interface AuthContextProps {
  userData: IUserSession | null;
  setUserData: (userData: IUserSession | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateUser: (updatedUser: IUserSession) => void; // Se agrega updateUser
  logout: () => void;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  userData: null,
  setUserData: () => {},
  isAuthenticated: false,
  isLoading: true,
  updateUser: () => {}, // Se agrega updateUser
  logout: () => {},
  signInWithGoogle: async () => {},
});

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();

  const storedUserData = typeof window !== "undefined" ? localStorage.getItem("userSession") : null;
  const initialUserData = storedUserData ? JSON.parse(storedUserData) : null;

  const [userData, setUserData] = useState<IUserSession | null>(initialUserData);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!userData?.token;

  const getSafeUserDataForStorage = (data: IUserSession) => {
    return {
      token: data.token,
      user: {
        email: data.user.email,
        nombre: data.user.nombre,
        apellido: data.user.apellido,
        idUser: data.user.idUser,
        dni: data.user.dni,
        isAdmin: data.user.isAdmin,
        imagenUrl: data.user.imagenUrl,
        fechaPago: data.user.fechaPago,
        recibirRecordatoriosAniversarios: data.user.recibirRecordatoriosAniversarios,
        phoneNumber: data.user.phoneNumber,
        password: data.user.password,
      },
    };
  };

  useEffect(() => {
    if (userData) {
      const safeData = getSafeUserDataForStorage(userData);
      localStorage.setItem("userSession", JSON.stringify(safeData));
      Cookies.set("userData", JSON.stringify(safeData));
    }
  }, [userData]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          const dbUser = await checkAndCreateUser(session.user);
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
              phoneNumber: dbUser.phoneNumber || 0,
              password: dbUser.password || "",
            },
          };

          setUserData(userInfo);
          const safeData = getSafeUserDataForStorage(userInfo);
          Cookies.set("userData", JSON.stringify(safeData));
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!userData) {
      fetchSession();
    } else {
      setIsLoading(false);
    }
  }, [userData]); //era array vacio, agrego userData para build

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        try {
          const dbUser = await checkAndCreateUser(session.user);
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
              phoneNumber: dbUser.phoneNumber || 0,
              password: dbUser.password || "",
            },
          };

          setUserData(userInfo);
          const safeData = getSafeUserDataForStorage(userInfo);
          Cookies.set("userData", JSON.stringify(safeData));
        } catch (error) {
          console.error("Error in onAuthStateChange:", error);
        }
      }

      if (event === "SIGNED_OUT") {
        setUserData(null);
        Cookies.remove("userData");
        localStorage.removeItem("userSession");
        router.push("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    setUserData(null);
    Cookies.remove("userData", { path: "" });
    localStorage.removeItem("sb-wbdarmsigbqzvkvcezkt-auth-token");
    localStorage.removeItem("userSession");
    router.push("/login");
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback/google`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  // Paso 1: Función updateUser
  const updateUser = (updatedUser: IUserSession) => {
    setUserData((prev) => (prev ? { ...prev, user: { ...prev.user, ...updatedUser.user } } : prev));

    if (userData) {
      const safeData = getSafeUserDataForStorage({
        ...userData,
        user: { ...userData.user, ...updatedUser.user },
      });
      localStorage.setItem("userSession", JSON.stringify(safeData));
      Cookies.set("userData", JSON.stringify(safeData));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        isAuthenticated,
        isLoading,
        updateUser, // Paso 2: Se agrega a AuthContext
        logout,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);




























// "use client"
// import { createContext, useContext, useState, useEffect } from "react"
// import type React from "react"

// import { supabase, checkAndCreateUser } from "@/lib/supabase"
// import Cookies from "js-cookie"
// import { useRouter } from "next/navigation"


// // Ensure IUserSession matches our DbUser structure
// export interface IUserSession {
//   token: string;
//   user: {
//     email: string;
//     nombre: string;
//     apellido: string;
//     idUser: string;
//     dni: string | number;
//     isAdmin: boolean;
//     fechaPago: string | null;
//     imagenUrl: string | null;
//     recibirRecordatoriosAniversarios: boolean;
//     provider?: string; //agrego
//     phoneNumber: number; //agrego
//     password: string; //agrego
//   };
// }

// export interface AuthContextProps {
//   userData: IUserSession | null
//   setUserData: (userData: IUserSession | null) => void
//   isAuthenticated: boolean
//   logout: () => void
//   signInWithGoogle: () => Promise<void>
// }

// export const AuthContext = createContext<AuthContextProps>({
//   userData: null,
//   setUserData: () => {},
//   isAuthenticated: false,
//   logout: () => {},
//   signInWithGoogle: async () => {},
// })

// export interface AuthProviderProps {
//   children: React.ReactNode
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [userData, setUserData] = useState<IUserSession | null>(null)
//   const isAuthenticated = !!userData?.token
//   const router = useRouter()


//   // Función para filtrar datos sensibles antes de guardarlos
//   const getSafeUserDataForStorage = (data: IUserSession) => {
//     // Solo guardamos lo mínimo necesario para identificar al usuario
//     return {
//       token: data.token,
//       user: {
//         email: data.user.email,
//         nombre: data.user.nombre,
//         apellido: data.user.apellido,
//         idUser: data.user.idUser,
//         dni: data.user.dni, // Incluimos el DNI como solicitado
//         isAdmin: data.user.isAdmin,
//         imagenUrl: data.user.imagenUrl,
//         fechaPago: data.user.fechaPago,
//         recibirRecordatoriosAniversarios: data.user.recibirRecordatoriosAniversarios,
//         phoneNumber: data.user.phoneNumber, //agrego
//         password: data.user.password //agrego
//       }
//     };
//   }

//   useEffect(() => {
//     if (userData) {
//       // Guardar datos filtrados en localStorage (sin contraseña)
//       const safeData = getSafeUserDataForStorage(userData);
//       localStorage.setItem("userSession", JSON.stringify(safeData));
      
//       // Para cookies, también usar datos filtrados
//       Cookies.set("userData", JSON.stringify(safeData));
//     }
//   }, [userData])

//   useEffect(() => {
//     const storedUserData = localStorage.getItem("userSession")
//     if (storedUserData) {
//       const parsedUserData = JSON.parse(storedUserData)
//       setUserData(parsedUserData)
//     } else {
//       const initializeAuth = async () => {
//         try {
//           const {
//             data: { session },
//           } = await supabase.auth.getSession()

//           if (session) {
//             try {
//               // Check if user exists in custom table and create if not
//               const dbUser = await checkAndCreateUser(session.user)
//               console.log("User check/create completed in AuthContext:", dbUser)

//               const userInfo: IUserSession = {
//                 token: session.access_token,
//                 user: {
//                   email: dbUser.email || "",
//                   nombre: dbUser.nombre || "",
//                   apellido: dbUser.apellido || "",
//                   idUser: dbUser.idUser,
//                   dni: dbUser.dni || 0,
//                   isAdmin: dbUser.isAdmin || false,
//                   fechaPago: dbUser.fechaPago || null,
//                   imagenUrl: dbUser.imagenUrl || null,
//                   recibirRecordatoriosAniversarios: dbUser.recibirRecordatoriosAniversarios || true,
//                   phoneNumber: dbUser.phoneNumber || 0, //agrego
//                   password: dbUser.password || "", //agrego
              
//                 },
//               };
              
//               setUserData(userInfo)
              
//               // Usar datos filtrados para cookies
//               const safeData = getSafeUserDataForStorage(userInfo);
//               Cookies.set("userData", JSON.stringify(safeData))
//             } catch (error) {
//               console.error("Error checking/creating user in initializeAuth:", error)
//             }
//           }
//         } catch (error) {
//           console.error("Error in initializeAuth:", error)
//         }
//       }

//       initializeAuth()
//     }
//   }, [])

//   useEffect(() => {
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       console.log("Auth state changed:", event)

//       if (event === "SIGNED_IN" && session) {
//         try {
//           // Check if user exists in custom table and create if not
//           const dbUser = await checkAndCreateUser(session.user)
//           console.log("User check/create completed in onAuthStateChange:", dbUser)

//           const userInfo: IUserSession = {
//             token: session.access_token,
//             user: {
//               email: dbUser.email || "",
//               nombre: dbUser.nombre || "",
//               apellido: dbUser.apellido || "",
//               idUser: dbUser.idUser,
//               dni: dbUser.dni || 0,
//               isAdmin: dbUser.isAdmin || false,
//               fechaPago: dbUser.fechaPago || null,
//               imagenUrl: dbUser.imagenUrl || null,
//               recibirRecordatoriosAniversarios: dbUser.recibirRecordatoriosAniversarios || true,
//               phoneNumber: dbUser.phoneNumber || 0, //agrego
//               password: dbUser.password || "", //agrego
//             },
//           };

//           setUserData(userInfo)
          
//           // Usar datos filtrados para cookies
//           const safeData = getSafeUserDataForStorage(userInfo);
//           Cookies.set("userData", JSON.stringify(safeData))

//           // Don't redirect here - let the callback page handle it
//         } catch (error) {
//           console.error("Error checking/creating user in onAuthStateChange:", error)
//         }
//       }

//       if (event === "SIGNED_OUT") {
//         setUserData(null)
//         Cookies.remove("userData")
//         router.push("/login")
//       }
//     })

//     return () => {
//       subscription.unsubscribe()
//     }
//   }, [router])

//   const logout = async () => {
//     await supabase.auth.signOut()
//     setUserData(null)
//     Cookies.remove("userData", { path: "" })
//     localStorage.removeItem("sb-wbdarmsigbqzvkvcezkt-auth-token")
//     localStorage.removeItem("userSession")
//     router.push("/login")
//   }

//   const signInWithGoogle = async () => {
//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: "google",
//         options: {
//           redirectTo: `${window.location.origin}/auth/callback/google`,
//         },
//       })

//       if (error) {
//         throw error
//       }
//     } catch (error) {
//       console.error("Error signing in with Google:", error)
//       throw error
//     }
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         userData,
//         setUserData,
//         isAuthenticated,
//         logout,
//         signInWithGoogle,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)