"use client";
import { createContext, useContext, useState, useEffect } from "react";
// import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { IUserSession } from "@/types";


// Interface


export interface AuthContextProps {
  userData: IUserSession | null;
  setUserData: (userData: IUserSession | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  userData: null,
  setUserData: () => {},
  isAuthenticated: false,
  logout: () => {},
  signInWithGoogle: async () => {},
});

// Interface
export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Estado con la info de usuario
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const isAuthenticated = !!userData?.token;
  const router = useRouter();

  // Hook para guardar en localStorage
  useEffect(() => {
    if (userData) {
      localStorage.setItem(
        "userSession",
        JSON.stringify({ token: userData.token })
      );
      Cookies.set("userData", JSON.stringify(userData));
    }
  }, [userData]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userSession");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    } else {
      const initializeAuth = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          const userInfo = {
            token: session.access_token,
            user: {
              email: session.user.email ?? "",
              nombre:
                session.user.user_metadata?.nombre ||
                session.user.user_metadata?.name ||
                "",
              apellido:
                session.user.user_metadata?.apellido ||
                session.user.user_metadata?.family_name ||
                "",
              idUser: session.user.id,
              dni: session.user.user_metadata?.dni || 0,
              isAdmin: session.user.user_metadata?.isAdmin || false,
              password: session.user.user_metadata?.password || "",
            },
          };
          setUserData(userInfo);
          Cookies.set("userData", JSON.stringify(userInfo));
        }
      };

      initializeAuth();
    }
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        const userInfo = {
          token: session.access_token,
          user: {
            email: session.user.email ?? "",
            nombre:
              session.user.user_metadata?.nombre ||
              session.user.user_metadata?.name ||
              "",
            apellido:
              session.user.user_metadata?.apellido ||
              session.user.user_metadata?.family_name ||
              "",
            idUser: session.user.id,
            dni: session.user.user_metadata?.dni || 0,
            isAdmin: session.user.user_metadata?.isAdmin || false,
            password: session.user.user_metadata?.password || "",
          },
        };

        setUserData(userInfo);
        Cookies.set("userData", JSON.stringify(userInfo));
        router.push("/dashboard/user");
      }

      if (event === "SIGNED_OUT") {
        setUserData(null);
        Cookies.remove("userData");
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
  );
};

// HOOK
export const useAuth = () => useContext(AuthContext);
