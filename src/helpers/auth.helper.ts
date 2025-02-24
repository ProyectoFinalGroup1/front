import { ILoginProps } from "@/types";
import { IRegisterProps } from "@/types/IRegister";
import toast from "react-hot-toast";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(userData: ILoginProps) {
    try {
        const response = await fetch(`${API_URL}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        
        const data = response.json();
        
        if(!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.message || "Error al Iniciar Seseión")
        }
        
        toast.success("Haz Iniciado Sesión!", {
          position:"top-center"
        });
        return data

    } catch (error: any) {
        toast.error(error.message || "Ocurrió un error al iniciar sesión. Intentá nuevamente", {
          position: "top-center"
        })
        throw error;
        
    }
}

export async function register(userData: IRegisterProps) {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
  
      const data = await response.json();
      
      toast.success("¡Registro exitoso!", {
        position: "top-right",
      });
  
      return data;
    } catch (error: any) {
      toast.error(error.message || "Error en el registro", {
        position: "top-right",
      });
      throw error;
    }
  }