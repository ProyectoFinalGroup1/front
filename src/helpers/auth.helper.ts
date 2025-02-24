import { ILoginProps } from "@/types";
import { IRegisterProps } from "@/types/IRegister";
import toast from "react-hot-toast";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(userData: ILoginProps) {
    try {
        const response = await fetch(`${API_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        if(response.ok){
            alert("Haz iniciado sesión con éxito")
            console.log(response)
            return response.json();
        } else {
            throw new Error('User already exist')
        }
    } catch (error: any) {
        alert("Ocurrió un error al iniciar sesión. Intenta nuevamente")
        
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